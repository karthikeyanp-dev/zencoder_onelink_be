import { IsNotEmpty, IsString, IsUrl, IsOptional, IsArray, IsEnum, IsInt } from 'class-validator';
import { PrivacyOverride } from '../entities/link.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLinkDto {
  @ApiProperty({ example: '9f1b3b6e-2d7b-4d0a-8b8b-2b3d4e5f6a7b' })
  @IsNotEmpty()
  @IsString()
  collection_id: string;

  @ApiProperty({ example: 'https://example.com/article' })
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiPropertyOptional({ example: 'Great article' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'A short description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'https://example.com/favicon.ico' })
  @IsOptional()
  @IsString()
  favicon?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/preview.jpg' })
  @IsOptional()
  @IsString()
  preview_image?: string;

  @ApiPropertyOptional({ example: 'example.com' })
  @IsOptional()
  @IsString()
  domain?: string;

  @ApiPropertyOptional({ example: ['reading', 'tech'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ enum: PrivacyOverride })
  @IsOptional()
  @IsEnum(PrivacyOverride)
  privacy_override?: PrivacyOverride;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  position?: number;
}