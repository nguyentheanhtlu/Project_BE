import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Contract } from './contract.entity';
import { User } from './user.entity';

@Entity()
export class ContractSignature {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contract, { nullable: false })
  contract: Contract;

  @ManyToOne(() => User, { nullable: false })
  signer: User;

  @CreateDateColumn({ nullable: true })
  signedAt: Date;

  @Column({ type: 'enum', enum: ['pending', 'signed', 'rejected'], default: 'pending' })
  status: string;

  @Column({ length: 255, nullable: true })
  signatureImagePath: string;

  @Column({ nullable: true })
  pageNumber: number;

  @Column({ nullable: true })
  positionX: number;

  @Column({ nullable: true })
  positionY: number;
}
