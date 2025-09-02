import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Collection } from '../../collections/entities/collection.entity';

export enum PrivacyOverride {
  SHOW = 'show',
  HIDE = 'hide',
}

@Entity('links')
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  collection_id: string;

  @Column('text')
  url: string;

  @Column({ length: 500 })
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  favicon: string;

  @Column({ nullable: true })
  preview_image: string;

  @Column({ nullable: true })
  domain: string;

  @Column({ type: 'json', nullable: true })
  tags: string[];

  @Column({
    type: 'enum',
    enum: PrivacyOverride,
    nullable: true,
  })
  privacy_override: PrivacyOverride;

  @Column({ type: 'integer', default: 0 })
  position: number;

  @ManyToOne(() => Collection, collection => collection.links)
  @JoinColumn({ name: 'collection_id' })
  collection: Collection;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}