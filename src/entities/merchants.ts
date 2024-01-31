import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum DisbursementFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
}

@Entity('merchants')
export class Merchant {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
    unique: true,
  })
  reference!: string;

  @Column({
    name: 'live_on',
    nullable: false,
  })
  liveOn!: Date;

  @Column({
    nullable: false,
    name: 'disbursement_frequency',
  })
  disbursementFrequency!: DisbursementFrequency;

  @Column({
    nullable: false,
    name: 'minimum_monthly_fee',
  })
  minimumMonthlyFee!: number;
}
