import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Link } from '../../links/entities/link.entity';
import { Share } from '../../sharing/entities/share.entity';
import { PublicLink } from '../../sharing/entities/public-link.entity';

export enum PrivacyType {
  PRIVATE = 'private',
  SHARED = 'shared',
  PUBLIC = 'public',
}

@Entity('collections')
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  cover_image: string;

  @Column({
    type: 'enum',
    enum: PrivacyType,
    default: PrivacyType.PRIVATE,
  })
  privacy: PrivacyType;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.collections)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Link, link => link.collection)
  links: Link[];

  @OneToMany(() => Share, share => share.collection)
  shares: Share[];

  @OneToMany(() => PublicLink, publicLink => publicLink.collection)
  public_links: PublicLink[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}