import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prismaauth.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import axios from 'axios';

@Injectable()
export class AuthServiceService {
  
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  
  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
      }
    });
    
    await axios.post('http://localhost:3002/users', {
      id: user.id,
      username: user.username,
      email: user.email,
    });
    
    return { message: 'Register berhasil', userId: user.id };
  }
  
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email }
    });
    
    if (!user) throw new Error('User tidak ditemukan');
    
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new Error('Password salah');
    
    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);
    
    return { access_token: token };
  }
}