import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../users/dto/user.dto';

interface AuthResponse {
  access_token: string;
  user: UserDto;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password_hash)) {
      return { id: user.id, email: user.email, username: user.username };
    }
    return null;
  }

  async login(user: { id: string; email: string; username: string }): Promise<AuthResponse> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }

  async register(email: string, username: string, password: string): Promise<AuthResponse> {
    // Check if user already exists
    const existingEmail = await this.usersService.findByEmail(email);
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    const existingUsername = await this.usersService.findByUsername(username);
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    // Hash password
    const password_hash = await this.usersService.hashPassword(password);

    // Create new user
    const newUser = await this.usersService.create({
      email,
      username,
      password_hash,
    });

    // Return JWT token
    return this.login({ id: newUser.id, email: newUser.email, username: newUser.username });
  }
}