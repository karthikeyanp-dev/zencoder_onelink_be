import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Collection } from '../../collections/entities/collection.entity';
import { User } from '../../users/entities/user.entity';

export enum PermissionType {
  VIEW = 'view',
  EDIT = 'edit',
}

@Entity('shares')
export class Share {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  collection_id: string;

  @Column()
  shared_by: string;

  @Column()
  shared_with: string;

  @Column({
    type: 'enum',
    enum: PermissionType,
    default: PermissionType.VIEW,
  })
  permission: PermissionType;

  @ManyToOne(() => Collection, collection => collection.shares)
  @JoinColumn({ name: 'collection_id' })
  collection: Collection;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'shared_by' })
  owner: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'shared_with' })
  recipient: User;

  @CreateDateColumn()
  created_at: Date;
}