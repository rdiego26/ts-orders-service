import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Disbursement } from './disbursements';
import { Order } from './orders';

@Entity('disbursementOrders')
export class DisbursementOrders {
  @PrimaryColumn()
  id!: string;

  @Column({ name: 'disbursement_id' })
  @OneToOne((type) => Disbursement)
  @JoinColumn({ name: 'disbursement_id', referencedColumnName: 'id' })
  disbursement!: Disbursement;

  @Column({ name: 'order_id' })
  @OneToOne((type) => Order)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order!: Order;

  @Column({
    nullable: false,
  })
  amount!: number;

  @Column({
    nullable: false,
  })
  fee!: number;
}
