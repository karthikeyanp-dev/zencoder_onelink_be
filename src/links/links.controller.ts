import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { LinksService } from './links.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './entities/link.entity';

@Controller('links')
@UseGuards(JwtAuthGuard)
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get('collection/:collectionId')
  async findAll(@Param('collectionId') collectionId: string, @Request() req): Promise<Link[]> {
    return this.linksService.findAll(collectionId, req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<Link> {
    return this.linksService.findOne(id, req.user.id);
  }

  @Post()
  async create(@Body() createLinkDto: CreateLinkDto, @Request() req): Promise<Link> {
    return this.linksService.create(createLinkDto, req.user.id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLinkDto: UpdateLinkDto,
    @Request() req,
  ): Promise<Link> {
    return this.linksService.update(id, updateLinkDto, req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    return this.linksService.remove(id, req.user.id);
  }

  @Put('collection/:collectionId/positions')
  async updatePositions(
    @Param('collectionId') collectionId: string,
    @Body() linkIds: string[],
    @Request() req,
  ): Promise<void> {
    return this.linksService.updatePositions(collectionId, linkIds, req.user.id);
  }
}