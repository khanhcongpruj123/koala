import { Module } from '@nestjs/common';
import { UserProfileService } from './profile.service';
import { UserProfileController } from './profile.controller';

@Module({
  imports: [],
  providers: [UserProfileService],
  controllers: [UserProfileController],
  exports: [UserProfileService],
})
export class ProfileModule {}
