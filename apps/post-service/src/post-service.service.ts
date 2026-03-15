import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from './prismapost.service';

@Injectable()
export class PostServiceService {
  constructor(private prisma: PrismaService) {}
  
  getPosts() {
    return this.prisma.post.findMany();
  }
  
  getPostById(id: number) {
    return this.prisma.post.findUnique({
      where: { id: id}
    });
  }0  
  
  getPostByUser(user_id: number) {
    return this.prisma.post.findMany({
      where: { user_id }
    });
  }
  
  createPost(dto: CreatePostDto) {
    return this.prisma.post.create({
      data: dto
    });
  }
  
  updatePost(id: number, dto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: dto
    });
  }
  
  deletePost(id: number) {
    return this.prisma.post.delete({
      where: { id }
    });
  }
}