import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Collection, PrivacyType } from '../collections/entities/collection.entity';
import { Link } from '../links/entities/link.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DatabaseSeeder {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Collection)
    private collectionsRepository: Repository<Collection>,
    @InjectRepository(Link)
    private linksRepository: Repository<Link>,
  ) {}

  async seed() {
    // Check if database is already seeded
    const userCount = await this.usersRepository.count();
    if (userCount > 0) {
      console.log('Database already seeded');
      return;
    }

    console.log('Seeding database...');

    // Create test user
    const passwordHash = await this.hashPassword('password123');
    const user = await this.usersRepository.save({
      email: 'test@example.com',
      username: 'testuser',
      password_hash: passwordHash,
      display_name: 'Test User',
      email_verified: true,
    });

    // Create collections
    const collection1 = await this.collectionsRepository.save({
      name: 'Development Resources',
      description: 'Useful resources for software development',
      privacy: PrivacyType.PRIVATE,
      user_id: user.id,
    });

    const collection2 = await this.collectionsRepository.save({
      name: 'Design Inspiration',
      description: 'UI/UX design inspiration and resources',
      privacy: PrivacyType.PUBLIC,
      user_id: user.id,
    });

    // Create links
    await this.linksRepository.save([
      {
        collection_id: collection1.id,
        url: 'https://nestjs.com',
        title: 'NestJS Official Documentation',
        description: 'A progressive Node.js framework for building efficient and scalable server-side applications.',
        domain: 'nestjs.com',
        tags: ['nestjs', 'backend', 'typescript'],
        position: 0,
      },
      {
        collection_id: collection1.id,
        url: 'https://typeorm.io',
        title: 'TypeORM Documentation',
        description: 'TypeORM is an ORM that can run in NodeJS and can be used with TypeScript and JavaScript.',
        domain: 'typeorm.io',
        tags: ['typeorm', 'database', 'orm'],
        position: 1,
      },
      {
        collection_id: collection2.id,
        url: 'https://dribbble.com',
        title: "Dribbble - Discover the World's Top Designers & Creative Professionals",
        description: 'Find Top Designers & Creative Professionals on Dribbble.',
        domain: 'dribbble.com',
        tags: ['design', 'inspiration', 'ui'],
        position: 0,
      },
    ]);

    console.log('Database seeded successfully');
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}