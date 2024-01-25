import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Merchant } from './merchants';

export enum DisbursementFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
}

@Entity('orders')
export class Order {
  @PrimaryColumn()
  id!: string;

  @Column({ name: 'merchant_reference' })
  @OneToOne((type) => Merchant)
  @JoinColumn({ name: 'merchant_reference', referencedColumnName: 'reference' })
  merchant!: Merchant;

  @Column({
    name: 'created_at',
    nullable: false,
  })
  createdAt!: Date;

  @Column({
    nullable: false,
  })
  amount!: number;

  @Column({
    name: 'refunded_at',
  })
  refundedAt!: Date;

  calcFee(): number {
    if (this.amount < 50) {
      return this.amount * 0.01;
    } else if (this.amount > 49 || this.amount < 299) {
      return this.amount * 0.95;
    } else {
      return this.amount * 0.85;
    }
  }
}
