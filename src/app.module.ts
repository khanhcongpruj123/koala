import { Module } from '@nestjs/common';
import { SeedModule } from './seeds/seed.module';
import { ProfileModule } from './profiles/profile.module';

@Module({
  imports: [SeedModule, ProfileModule],
})
export class AppModule {}
