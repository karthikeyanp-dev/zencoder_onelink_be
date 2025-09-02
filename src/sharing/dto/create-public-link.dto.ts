import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePublicLinkDto {
  @ApiProperty({ example: '9f1b3b6e-2d7b-4d0a-8b8b-2b3d4e5f6a7b' })
  @IsNotEmpty()
  @IsString()
  collection_id: string;

  @ApiPropertyOptional({ type: String, example: '2025-12-31T23:59:59.000Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expires_at?: Date;
}