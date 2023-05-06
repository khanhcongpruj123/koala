import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.middleware';
import { ProfileModule } from 'src/profiles/profile.module';

@Module({
  imports: [ProfileModule],
  controllers: [SeedController],
  providers: [
    SeedService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class SeedModule {}
