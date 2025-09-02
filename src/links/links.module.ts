import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { CollectionsModule } from '../collections/collections.module';
import { MetadataModule } from '../metadata/metadata.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Link]),
    CollectionsModule,
    MetadataModule,
  ],
  providers: [LinksService],
  controllers: [LinksController],
  exports: [LinksService],
})
export class LinksModule {}