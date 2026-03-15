import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { JwtStrategy } from 'apps/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prismauser.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'Jangandibobol1234',
    }),
  ],
  controllers: [UserServiceController],
  providers: [UserServiceService, PrismaService, JwtStrategy],
})
export class UserServiceModule {}
