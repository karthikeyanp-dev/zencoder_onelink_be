import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { CollectionsService } from '../collections/collections.service';
import { MetadataService } from '../metadata/metadata.service';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private linksRepository: Repository<Link>,
    private collectionsService: CollectionsService,
    private metadataService: MetadataService,
  ) {}

  async findAll(collectionId: string, userId: string): Promise<Link[]> {
    // Verify user has access to this collection
    await this.collectionsService.findOne(collectionId, userId);

    return this.linksRepository.find({
      where: { collection_id: collectionId },
      order: { position: 'ASC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Link> {
    const link = await this.linksRepository.findOne({
      where: { id },
      relations: ['collection'],
    });

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    // Verify user has access to this collection
    await this.collectionsService.findOne(link.collection_id, userId);

    return link;
  }

  async create(createLinkDto: CreateLinkDto, userId: string): Promise<Link> {
    // Verify user has access to this collection
    await this.collectionsService.findOne(createLinkDto.collection_id, userId);

    // Extract metadata if not provided
    if (!createLinkDto.title) {
      const metadata = await this.metadataService.extractMetadata(createLinkDto.url);
      
      createLinkDto.title = createLinkDto.title || metadata.title;
      createLinkDto.description = createLinkDto.description || metadata.description;
      createLinkDto.favicon = createLinkDto.favicon || metadata.favicon;
      createLinkDto.preview_image = createLinkDto.preview_image || metadata.previewImage;
      createLinkDto.domain = createLinkDto.domain || metadata.domain;
    }

    // Get max position for this collection
    const maxPositionResult = await this.linksRepository
      .createQueryBuilder('link')
      .select('MAX(link.position)', 'maxPosition')
      .where('link.collection_id = :collectionId', { collectionId: createLinkDto.collection_id })
      .getRawOne();

    const position = maxPositionResult.maxPosition ? maxPositionResult.maxPosition + 1 : 0;

    const link = this.linksRepository.create({
      ...createLinkDto,
      position,
    });

    return this.linksRepository.save(link);
  }

  async update(id: string, updateLinkDto: UpdateLinkDto, userId: string): Promise<Link> {
    const link = await this.findOne(id, userId);

    // Verify user has access to this collection
    const collection = await this.collectionsService.findOne(link.collection_id, userId);

    // Check if user owns this collection
    if (collection.user_id !== userId) {
      throw new ForbiddenException('You do not have permission to update this link');
    }

    await this.linksRepository.update(id, updateLinkDto);
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string): Promise<void> {
    const link = await this.findOne(id, userId);

    // Verify user has access to this collection
    const collection = await this.collectionsService.findOne(link.collection_id, userId);

    // Check if user owns this collection
    if (collection.user_id !== userId) {
      throw new ForbiddenException('You do not have permission to delete this link');
    }

    await this.linksRepository.delete(id);
  }

  async updatePositions(collectionId: string, linkIds: string[], userId: string): Promise<void> {
    // Verify user has access to this collection
    const collection = await this.collectionsService.findOne(collectionId, userId);

    // Check if user owns this collection
    if (collection.user_id !== userId) {
      throw new ForbiddenException('You do not have permission to update link positions');
    }

    // Update positions in a transaction
    await this.linksRepository.manager.transaction(async manager => {
      for (let i = 0; i < linkIds.length; i++) {
        await manager.update(Link, { id: linkIds[i] }, { position: i });
      }
    });
  }
}