import { IsOptional, IsString, IsEnum } from 'class-validator';
import { PrivacyType } from '../entities/collection.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCollectionDto {
  @ApiPropertyOptional({ example: 'My Recipes v2' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/new-cover.jpg' })
  @IsOptional()
  @IsString()
  cover_image?: string;

  @ApiPropertyOptional({ enum: PrivacyType })
  @IsOptional()
  @IsEnum(PrivacyType)
  privacy?: PrivacyType;
}