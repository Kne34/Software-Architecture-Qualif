import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PostServiceService } from './post-service.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostServiceController {
  constructor(private readonly postService: PostServiceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  getPosts() {
    return this.postService.getPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID' })
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(Number(id));
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get posts by user ID' })
  getPostByUser(@Param('userId') userId: string) {
    return this.postService.getPostByUser(Number(userId));
  }

  @Post()
  @ApiOperation({ summary: 'Create post' })
  createPost(@Body() dto: CreatePostDto) {
    return this.postService.createPost(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update post' })
  updatePost(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postService.updatePost(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post' })
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(Number(id));
  }
}