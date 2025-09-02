import { IsNotEmpty, IsString, IsEnum, IsEmail } from 'class-validator';
import { PermissionType } from '../entities/share.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShareDto {
  @ApiProperty({ example: '9f1b3b6e-2d7b-4d0a-8b8b-2b3d4e5f6a7b' })
  @IsNotEmpty()
  @IsString()
  collection_id: string;

  @ApiProperty({ example: 'friend@example.com' })
  @IsNotEmpty()
  @IsEmail()
  shared_with_email: string;

  @ApiProperty({ enum: PermissionType, example: PermissionType.VIEW })
  @IsNotEmpty()
  @IsEnum(PermissionType)
  permission: PermissionType;
}