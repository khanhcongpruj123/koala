import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SeedService } from './seed.service';
import { AuthGuard, Public } from 'src/auth/auth.middleware';
import { Request } from 'express';
import { UserProfileService } from 'src/profiles/profile.service';

@Controller('/seeds')
export class SeedController {
  constructor(
    private readonly seedService: SeedService,
    private readonly userProfileService: UserProfileService,
  ) {}

  @Get('/')
  async getSeeds(@Req() resquest: Request) {
    const authSession = resquest['authSession'];
    const userProfile = await this.userProfileService.getProfileByUserId(
      authSession.identity.id,
    );
    return await this.seedService.getSeedByProfileId(userProfile.id);
  }

  @Get('/samples')
  @Public()
  getSeedSamples() {
    return this.seedService.getAllSeedSample();
  }

  @Post('/samples/:code/buy')
  async buySeed(@Req() request: Request, @Param('code') code: string) {
    const authSession = request['authSession'];
    const userProfile = await this.userProfileService.getProfileByUserId(
      authSession.identity.id,
    );
    return await this.seedService.buy(userProfile, code);
  }
}
