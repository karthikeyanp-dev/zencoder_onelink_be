import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Share } from './entities/share.entity';
import { PublicLink } from './entities/public-link.entity';
import { SharingService } from './sharing.service';
import { SharingController } from './sharing.controller';
import { CollectionsModule } from '../collections/collections.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Share, PublicLink]),
    CollectionsModule,
    UsersModule,
  ],
  providers: [SharingService],
  controllers: [SharingController],
  exports: [SharingService],
})
export class SharingModule {}