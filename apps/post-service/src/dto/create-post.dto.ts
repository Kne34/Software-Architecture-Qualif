import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}