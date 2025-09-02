import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { PrivacyType } from '../entities/collection.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCollectionDto {
  @ApiProperty({ example: 'My Recipes' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Links to my favorite recipes' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/cover.jpg' })
  @IsOptional()
  @IsString()
  cover_image?: string;

  @ApiPropertyOptional({ enum: PrivacyType, default: PrivacyType.PRIVATE })
  @IsOptional()
  @IsEnum(PrivacyType)
  privacy?: PrivacyType = PrivacyType.PRIVATE;
}