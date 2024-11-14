import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Contract } from './contract.entity';
import { User } from './user.entity';

@Entity()
export class ContractAttachment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contract, { nullable: false })
  contract: Contract;

  @Column({ length: 255, nullable: true })
  fileName: string;

  @Column({ length: 500 })
  filePath: string;

  @Column({ length: 50, nullable: true })
  fileType: string;

  @CreateDateColumn()
  uploadedAt: Date;

  @ManyToOne(() => User)
  uploadedBy: User;

  @Column({ type: 'enum', enum: ['contract_display', 'note'] })
  attachmentPurpose: string;
}
