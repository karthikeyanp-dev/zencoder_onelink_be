import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SharingService } from './sharing.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateShareDto } from './dto/create-share.dto';
import { CreatePublicLinkDto } from './dto/create-public-link.dto';
import { Share } from './entities/share.entity';
import { PublicLink } from './entities/public-link.entity';

@Controller('sharing')
@UseGuards(JwtAuthGuard)
export class SharingController {
  constructor(private readonly sharingService: SharingService) {}

  @Get('shares')
  async findShares(@Request() req): Promise<Share[]> {
    return this.sharingService.findShares(req.user.id);
  }

  @Get('collection/:collectionId/shares')
  async findCollectionShares(@Param('collectionId') collectionId: string, @Request() req): Promise<Share[]> {
    return this.sharingService.findCollectionShares(collectionId, req.user.id);
  }

  @Post('share')
  async createShare(@Body() createShareDto: CreateShareDto, @Request() req): Promise<Share> {
    return this.sharingService.createShare(createShareDto, req.user.id);
  }

  @Delete('share/:id')
  async removeShare(@Param('id') id: string, @Request() req): Promise<void> {
    return this.sharingService.removeShare(id, req.user.id);
  }

  @Get('collection/:collectionId/public-links')
  async findPublicLinks(@Param('collectionId') collectionId: string, @Request() req): Promise<PublicLink[]> {
    return this.sharingService.findPublicLinks(collectionId, req.user.id);
  }

  @Post('public-link')
  async createPublicLink(@Body() createPublicLinkDto: CreatePublicLinkDto, @Request() req): Promise<PublicLink> {
    return this.sharingService.createPublicLink(createPublicLinkDto, req.user.id);
  }

  @Delete('public-link/:id')
  async removePublicLink(@Param('id') id: string, @Request() req): Promise<void> {
    return this.sharingService.removePublicLink(id, req.user.id);
  }
}