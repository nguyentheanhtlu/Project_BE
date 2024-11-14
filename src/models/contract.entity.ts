import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  contractNumber: string;

  @ManyToOne(() => User, { nullable: false })
  customer: User;

  @Column({ length: 100, nullable: true })
  contractType: string;

  @ManyToOne(() => User, { nullable: false })
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column()
  signersCount: number;

  @Column({ type: 'enum', enum: ['new', 'pending', 'signed', 'rejected'], default: 'new' })
  status: string;

  @Column({ type: 'text', nullable: true })
  note: string;
}
