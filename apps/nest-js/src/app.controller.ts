import { Body, Controller, Delete, Get, Header, Headers, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'apps/auth-service/src/dto/login.dto';
import { RegisterDto } from 'apps/auth-service/src/dto/register.dto';
import { CreatePostDto } from 'apps/post-service/src/dto/create-post.dto';
import { UpdatePostDto } from 'apps/post-service/src/dto/update-post.dto';
import axios from 'axios';

@Controller()
export class AppController {
  
  @ApiTags('Auth')
  @Post('auth/register')
  async register(@Body() body: RegisterDto) {
    const res = await axios.post('http://localhost:3001/auth/register', body);
    return res.data;
  }
  
  @ApiTags('Auth')
  @Post('auth/login')
  async login(@Body() body: LoginDto) {
    const res = await axios.post('http://localhost:3001/auth/login', body);
    return res.data;
  }
  
  @ApiTags('Users')
  @ApiBearerAuth()
  @Get('users')
  async getUsers(@Headers('authorization') auth: string) {
    const res = await axios.get('http://localhost:3002/users', {
      headers: { authorization: auth }
    });
    return res.data;
  }
  
  @ApiTags('Users')
  @ApiBearerAuth()
  @Get('users/:id')
  async getUserById(@Param('id') id: number, @Headers('authorization') auth: string) {
    const res = await axios.get(`http://localhost:3002/users/${id}`, {
      headers: { authorization: auth }
    });
    return res.data;
  }
  
  @ApiTags('Posts')
  @ApiBearerAuth()
  @Get('posts')
  async getPosts(@Headers('authorization') auth: string) {
    const res = await axios.get('http://localhost:3003/posts', {
      headers: { authorization: auth }
    });
    return res.data;
  }
  
  @ApiTags('Posts')
  @ApiBearerAuth()
  @Get('posts/:id')
  async getPostById(@Param('id') id: string, @Headers('authorization') auth: string) {
    const res = await axios.get(`http://localhost:3003/posts/${id}`, {
      headers: { authorization: auth }
    });
    return res.data;
  }
  
  @ApiTags('Posts')
  @ApiBearerAuth()
  @Get('posts/user/:userId')
  async getPostByUser(@Param('userId') userId: string, @Headers('authorization') auth: string) {
    const res = await axios.get(`http://localhost:3003/posts/user/${userId}`, {
      headers: { authorization: auth }
    });
    return res.data;
  }
  
  @ApiTags('Posts')
  @ApiBearerAuth()
  @Post('posts')
  async createPost(@Body() body: CreatePostDto, @Headers('authorization') auth: string) {
    const res = await axios.post('http://localhost:3003/posts', body, {
      headers: { authorization: auth }
    });
    return res.data;
  }
  
  @ApiTags('Posts')
  @ApiBearerAuth()
  @Put('posts/:id')
  async updatePost(@Param('id') id: string, @Body() body: UpdatePostDto, @Headers('authorization') auth: string) {
    const res = await axios.put(`http://localhost:3003/posts/${id}`, body, {
      headers: { authorization: auth }
    });
    return res.data;
  }
  
  @ApiTags('Posts')
  @ApiBearerAuth()
  @Delete('posts/:id')
  async deletePost(@Param('id') id: string, @Headers('authorization') auth: string) {
    const res = await axios.delete(`http://localhost:3003/posts/${id}`, {
      headers: { authorization: auth }
    });
    return res.data;
  }
}
