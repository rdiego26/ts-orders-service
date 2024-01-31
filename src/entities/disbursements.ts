import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Merchant } from './merchants';

@Entity('disbursements')
export class Disbursement {
  @PrimaryColumn()
  id!: string;

  @Column({
    nullable: false,
  })
  reference!: string;

  @Column({ name: 'merchant_reference' })
  @OneToOne((type) => Merchant)
  @JoinColumn({ name: 'merchant_reference', referencedColumnName: 'reference' })
  merchant!: Merchant;

  @Column({
    name: 'created_at',
    nullable: false,
  })
  createdAt!: Date;
}
