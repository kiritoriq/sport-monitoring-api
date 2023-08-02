import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column('varchar', {
    unique: true,
  })
  email: string;

  @Column('varchar')
  name: string;

  @Column('varchar', {
    unique: true,
    length: 30,
  })
  phone: string;

  @Column('varchar', {
    unique: true,
    length: 30,
  })
  username: string;

  @Column('varchar')
  password: string;

  @Column('text')
  address: string;

  @Column('tinyint', {
    default: 1,
  })
  is_active: number;

  @CreateDateColumn({
    type: 'timestamp',
    insert: true,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
