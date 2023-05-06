import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserProfileService } from './profile.service';
import { CreateProfileRequest } from './profile.dto';

@Controller('profiles')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  async createProfile(
    @Body() createProfileRequest: CreateProfileRequest,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const authSession = request['authSession'];
    const userProfile = await this.userProfileService.createIfNotExist(
      authSession.identity.id,
      createProfileRequest.name,
    );
    response.json(userProfile);
  }

  @Get()
  async getProfile(@Req() request: Request) {
    const authSession = request['authSession'];
    return this.userProfileService.getProfileByUserId(authSession.identity.id);
  }
}
