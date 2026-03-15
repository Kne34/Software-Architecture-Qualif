import { Module } from '@nestjs/common';
import { PostServiceController } from './post-service.controller';
import { PostServiceService } from './post-service.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prismapost.service';
import { JwtStrategy } from 'apps/jwt.strategy';

@Module({
  imports: [
      PassportModule,
      JwtModule.register({
        secret: 'Jangandibobol1234',
      }),
    ],
  controllers: [PostServiceController],
  providers: [PostServiceService, PrismaService, JwtStrategy],
})
export class PostServiceModule {}
