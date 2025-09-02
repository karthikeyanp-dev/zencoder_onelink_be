import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Collection } from '../../collections/entities/collection.entity';

@Entity('public_links')
export class PublicLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  collection_id: string;

  @Column({ length: 10, unique: true })
  short_id: string;

  @Column({ nullable: true })
  expires_at: Date;

  @ManyToOne(() => Collection, collection => collection.public_links)
  @JoinColumn({ name: 'collection_id' })
  collection: Collection;

  @CreateDateColumn()
  created_at: Date;
}