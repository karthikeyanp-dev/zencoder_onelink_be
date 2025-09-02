import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Share, PermissionType } from './entities/share.entity';
import { PublicLink } from './entities/public-link.entity';
import { CreateShareDto } from './dto/create-share.dto';
import { CreatePublicLinkDto } from './dto/create-public-link.dto';
import { CollectionsService } from '../collections/collections.service';
import { UsersService } from '../users/users.service';
import { randomBytes } from 'crypto';

@Injectable()
export class SharingService {
  constructor(
    @InjectRepository(Share)
    private sharesRepository: Repository<Share>,
    @InjectRepository(PublicLink)
    private publicLinksRepository: Repository<PublicLink>,
    private collectionsService: CollectionsService,
    private usersService: UsersService,
  ) {}

  async findShares(userId: string): Promise<Share[]> {
    return this.sharesRepository.find({
      where: [
        { shared_by: userId },
        { shared_with: userId },
      ],
      relations: ['collection'],
    });
  }

  async findCollectionShares(collectionId: string, userId: string): Promise<Share[]> {
    // Verify user has access to this collection
    const collection = await this.collectionsService.findOne(collectionId, userId);

    // Check if user owns this collection
    if (collection.user_id !== userId) {
      throw new ForbiddenException('You do not have permission to view shares for this collection');
    }

    return this.sharesRepository.find({
      where: { collection_id: collectionId },
      relations: ['recipient'],
    });
  }

  async createShare(createShareDto: CreateShareDto, userId: string): Promise<Share> {
    // Verify user has access to this collection
    const collection = await this.collectionsService.findOne(createShareDto.collection_id, userId);

    // Check if user owns this collection
    if (collection.user_id !== userId) {
      throw new ForbiddenException('You do not have permission to share this collection');
    }

    // Find recipient user by email
    const recipient = await this.usersService.findByEmail(createShareDto.shared_with_email);
    if (!recipient) {
      throw new NotFoundException(`User with email ${createShareDto.shared_with_email} not found`);
    }

    // Check if share already exists
    const existingShare = await this.sharesRepository.findOne({
      where: {
        collection_id: createShareDto.collection_id,
        shared_with: recipient.id,
      },
    });

    if (existingShare) {
      throw new ConflictException('This collection is already shared with this user');
    }

    const share = this.sharesRepository.create({
      collection_id: createShareDto.collection_id,
      shared_by: userId,
      shared_with: recipient.id,
      permission: createShareDto.permission,
    });

    return this.sharesRepository.save(share);
  }

  async removeShare(id: string, userId: string): Promise<void> {
    const share = await this.sharesRepository.findOne({
      where: { id },
      relations: ['collection'],
    });

    if (!share) {
      throw new NotFoundException('Share not found');
    }

    // Check if user owns this collection or is the recipient
    if (share.shared_by !== userId && share.shared_with !== userId) {
      throw new ForbiddenException('You do not have permission to remove this share');
    }

    await this.sharesRepository.delete(id);
  }

  async findPublicLinks(collectionId: string, userId: string): Promise<PublicLink[]> {
    // Verify user has access to this collection
    const collection = await this.collectionsService.findOne(collectionId, userId);

    // Check if user owns this collection
    if (collection.user_id !== userId) {
      throw new ForbiddenException('You do not have permission to view public links for this collection');
    }

    return this.publicLinksRepository.find({
      where: { collection_id: collectionId },
    });
  }

  async createPublicLink(createPublicLinkDto: CreatePublicLinkDto, userId: string): Promise<PublicLink> {
    // Verify user has access to this collection
    const collection = await this.collectionsService.findOne(createPublicLinkDto.collection_id, userId);

    // Check if user owns this collection
    if (collection.user_id !== userId) {
      throw new ForbiddenException('You do not have permission to create public links for this collection');
    }

    // Generate a unique short ID
    const shortId = this.generateShortId();

    const publicLink = this.publicLinksRepository.create({
      collection_id: createPublicLinkDto.collection_id,
      short_id: shortId,
      expires_at: createPublicLinkDto.expires_at,
    });

    return this.publicLinksRepository.save(publicLink);
  }

  async removePublicLink(id: string, userId: string): Promise<void> {
    const publicLink = await this.publicLinksRepository.findOne({
      where: { id },
      relations: ['collection'],
    });

    if (!publicLink) {
      throw new NotFoundException('Public link not found');
    }

    // Verify user has access to this collection
    const collection = await this.collectionsService.findOne(publicLink.collection_id, userId);

    // Check if user owns this collection
    if (collection.user_id !== userId) {
      throw new ForbiddenException('You do not have permission to remove this public link');
    }

    await this.publicLinksRepository.delete(id);
  }

  private generateShortId(): string {
    // Generate a random 10-character string
    return randomBytes(5).toString('hex').substring(0, 10);
  }
}