import { IsOptional, IsString, IsUrl, IsArray, IsEnum, IsInt } from 'class-validator';
import { PrivacyOverride } from '../entities/link.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLinkDto {
  @ApiPropertyOptional({ example: 'https://example.com/article' })
  @IsOptional()
  @IsUrl()
  url?: string;

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