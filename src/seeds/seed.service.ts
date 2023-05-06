import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Seed, UserProfile } from '@prisma/client';
import { NotEnoughtCoinException } from './seed.error';
import * as mqtt from 'mqtt';
import { client } from 'src/providers/mqtt';
import { MinusCoinEvent } from 'src/base/event';

@Injectable()
export class SeedService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * @param code : seed sample code you want buy
   */
  async buy(userProfile: UserProfile, code: string) {
    const seedSample = await this.seedSample.findUnique({
      where: {
        code: code,
      },
    });

    if (userProfile.coin < seedSample.originalPrice) {
      throw new NotEnoughtCoinException();
    }

    // take coin and put seed into user profile
    return await this.$transaction(async (tx) => {
      const buyer = await tx.userProfile.updateMany({
        where: {
          id: userProfile.id,
          version: userProfile.version,
        },
        data: {
          // take coin from user profile
          coin: {
            decrement: seedSample.originalPrice,
          },
          version: {
            increment: 1,
          },
        },
      });

      // check buying transaction is valid?
      if (buyer.count === 0) {
        throw new Error(
          `Buy is fail. This user profile has updated while you are buying!`,
        );
      }
      // create seed for user profile
      const seed = await tx.seed.create({
        data: {
          sample: {
            connect: {
              code: seedSample.code,
            },
          },
          owner: {
            connect: {
              id: userProfile.id,
            },
          },
        },
      });

      if (!seed) {
        throw new Error(`Buy is fail. Can not create seed`);
      }

      // send update coin event to client
      client.publish(
        `${userProfile.userId}/events`,
        JSON.stringify(new MinusCoinEvent(seedSample.originalPrice)),
      );

      return seed;
    });
  }

  plant(seed: Seed) {
    // TODO implement here
  }

  async getAllSeedSample() {
    return this.seedSample.findMany();
  }

  async getSeedByProfileId(userProfileId: string) {
    return await this.seed.findMany({
      where: {
        owner: {
          id: userProfileId,
        },
      },
      include: {
        sample: {},
      },
    });
  }
}
