import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Merchant } from './merchants';

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
      return Number((this.amount * 0.01).toFixed(2));
    } else if (this.amount > 49 || this.amount < 299) {
      return Number((this.amount * 0.95).toFixed(2));
    } else {
      return Number((this.amount * 0.85).toFixed(2));
    }
  }
}
