import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  code: string;

  @Column({ length: 255 })
  fullName: string;

  @Column({ type: 'enum', enum: ['Nam', 'Nữ', 'Khác'] })
  gender: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ length: 255, nullable: true })
  placeOfBirth: string;

  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ length: 20, unique: true })
  idNumber: string;

  @Column({ type: 'date', nullable: true })
  idIssueDate: Date;

  @Column({ length: 255, nullable: true })
  idIssuePlace: string;

  @Column({ length: 15, nullable: true })
  phoneNumber: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 100, nullable: true })
  department: string;

  @Column({ length: 100, nullable: true })
  position: string;

  @Column({ type: 'enum', enum: ['admin', 'employee', 'customer'], default: 'employee' })
  role: string;

  @Column({ length: 255, unique: true, nullable: true })
  username: string;

  @Column({ length: 255, nullable: true })
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({name: "refresh_token", type: "longtext", nullable: true})
  refreshToken: string;
  
  @Column({name: "active", type: "boolean", nullable: false, default: false})
  active: boolean
}
