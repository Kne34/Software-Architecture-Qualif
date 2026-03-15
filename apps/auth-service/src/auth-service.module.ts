import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prismaauth.service';
import { JwtStrategy } from 'apps/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'Jangandibobol1234',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService, PrismaService, JwtStrategy],
})
export class AuthServiceModule {}
