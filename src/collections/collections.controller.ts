import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from './entities/collection.entity';

@Controller('collections')
@UseGuards(JwtAuthGuard)
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  async findAll(@Request() req): Promise<Collection[]> {
    return this.collectionsService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<Collection> {
    return this.collectionsService.findOne(id, req.user.id);
  }

  @Post()
  async create(@Body() createCollectionDto: CreateCollectionDto, @Request() req): Promise<Collection> {
    return this.collectionsService.create(createCollectionDto, req.user.id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
    @Request() req,
  ): Promise<Collection> {
    return this.collectionsService.update(id, updateCollectionDto, req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    return this.collectionsService.remove(id, req.user.id);
  }
}