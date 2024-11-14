import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Contract } from './contract.entity';
import { User } from './user.entity';

@Entity()
export class ApprovalFlow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contract, { nullable: false })
  contract: Contract;

  @Column()
  stepNumber: number;

  @ManyToOne(() => User, { nullable: false })
  approver: User;

  @Column({ length: 255 })
  action: string;

  @Column({ type: 'enum', enum: ['internal', 'customer'] })
  actionSource: string;

  @Column({ type: 'enum', enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  approvalStatus: string;

  @CreateDateColumn()
  approvalDate: Date;

  @Column({ type: 'text', nullable: true })
  comments: string;
}
