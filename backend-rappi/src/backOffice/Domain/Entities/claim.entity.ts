import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { ClaimStatus } from '../Enum/claim-status';

@Entity({ name: 'claims' })
export class Claim {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  orderId: string;

  @Column({ nullable: true })
  vendorId?: string;

  @Column({ nullable: true })
  clientId?: string;

  @Column()
  contactEmail: string;

  @Column({ type: 'text' })
  claimerName: string;

  @Column({
    type: 'enum',
    enum: ClaimStatus,
    default: ClaimStatus.PENDING,
  })
  status: ClaimStatus;

  @CreateDateColumn()
  createdAt: Date;
}
