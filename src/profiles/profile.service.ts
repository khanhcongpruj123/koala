import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, UserProfile } from '@prisma/client';
import { NameIsExisted, ProfileIsExisted } from './profile.error';

@Injectable()
export class UserProfileService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  async getProfileByUserId(userId: string) {
    return await this.userProfile.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  async getProfileById(profileId: string) {
    return await this.userProfile.findUnique({
      where: {
        id: profileId,
      },
    });
  }

  async createIfNotExist(userId: string, name: string) {
    const existProfile = await this.userProfile.findUnique({
      where: {
        userId: userId,
      },
    });
    if (existProfile) {
      throw new ProfileIsExisted();
    } else {
      return await this.createDefaultProfile(userId, name);
    }
  }

  async updateName(id: string, name: string) {
    const isExistedName =
      (await this.userProfile.count({
        where: {
          name: name,
        },
      })) > 0;
    if (isExistedName) {
      throw new NameIsExisted();
    }
    return await this.userProfile.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  }

  async addExp(userProfile: UserProfile, amount: number) {
    userProfile.exp += amount;
    await this.userProfile.update({
      where: {
        id: userProfile.id,
      },
      data: {
        exp: userProfile.exp,
      },
    });
  }

  async updateAvatar(id: string, avatarUrl: string) {
    return await this.userProfile.update({
      where: {
        id: id,
      },
      data: {
        avatarUrl: avatarUrl,
      },
    });
  }

  async upgradeLevel(userProfile: UserProfile) {
    while (await this.upgradeToNextLevel(userProfile)) {}
    return await this.userProfile.update({
      where: {
        id: userProfile.id,
      },
      data: {
        level: userProfile.level,
      },
    });
  }

  private async upgradeToNextLevel(userProfile: UserProfile) {
    const nextLevel = await this.userProfileLevel.findUnique({
      where: {
        level: userProfile.level + 1,
      },
    });
    if (nextLevel && userProfile.exp >= nextLevel.requiredExp) {
      userProfile.level = nextLevel.level;
      return true;
    }
    return false;
  }

  private async createDefaultProfile(userId: string, name: string) {
    return await this.userProfile.create({
      data: {
        userId: userId,
        name: name ? name : `Unknow_${Date()}`,
        avatarUrl: '/public/users/profiles/defaut_avatar.png',
        coin: 1000,
        level: 1,
        exp: 0,
      },
    });
  }
}
