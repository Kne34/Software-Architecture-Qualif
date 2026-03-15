import { Injectable } from '@nestjs/common';
import { PrismaService } from './prismauser.service'; 

@Injectable()
export class UserServiceService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: any) {
    return this.prisma.user.create({
      data: {
        id: data.id,
        username: data.username,
        email: data.email,
      }
    });
  }
}