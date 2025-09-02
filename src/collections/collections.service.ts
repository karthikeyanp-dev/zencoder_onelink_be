import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection, PrivacyType } from './entities/collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,
  ) {}

  async findAll(userId: string): Promise<Collection[]> {
    return this.collectionsRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Collection> {
    const collection = await this.collectionsRepository.findOne({
      where: { id },
      relations: ['links'],
    });

    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    // Check if user has access to this collection
    if (collection.user_id !== userId && collection.privacy === PrivacyType.PRIVATE) {
      throw new ForbiddenException('You do not have access to this collection');
    }

    return collection;
  }

  async create(createCollectionDto: CreateCollectionDto, userId: string): Promise<Collection> {
    const collection = this.collectionsRepository.create({
      ...createCollectionDto,
      user_id: userId,
    });

    return this.collectionsRepository.save(collection);
  }

  async update(id: string, updateCollectionDto: UpdateCollectionDto, userId: string): Promise<Collection> {
    const collection = await this.findOne(id, userId);

    // Check if user owns this collection
    if (collection.user_id !== userId) {
      throw new ForbiddenException('You do not have permission to update this collection');
    }

    await this.collectionsRepository.update(id, updateCollectionDto);
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string): Promise<void> {
    const collection = await this.findOne(id, userId);

    // Check if user owns this collection
    if (collection.user_id !== userId) {
      throw new ForbiddenException('You do not have permission to delete this collection');
    }

    await this.collectionsRepository.delete(id);
  }
}