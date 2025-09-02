import { Controller, Get, Put, Delete, Body, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, type: UserDto })
  async getProfile(@Req() req): Promise<UserDto> {
    const user = await this.usersService.findOne(req.user.id);
    if (!user) return null as any;
    const { password_hash, ...safe } = user as any;
    return safe;
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, type: UserDto })
  async updateProfile(@Body() updateData: UpdateUserDto, @Req() req): Promise<UserDto> {
    const updated = await this.usersService.update(req.user.id, updateData);
    const { password_hash, ...safe } = updated as any;
    return safe;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('account')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete current user account' })
  @ApiResponse({ status: 204 })
  async deleteAccount(@Req() req): Promise<void> {
    await this.usersService.delete(req.user.id);
    return;
  }
}