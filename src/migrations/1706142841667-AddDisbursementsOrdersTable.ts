import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDisbursementsOrdersTable1706142841667 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
              create table if not exists disbursements_orders
              (
                  id         uuid                                   not null primary key,
                  disbursements_id uuid                           not null,
                  order_id text not null,
                  amount  numeric(5, 2) not null,
                  fee  numeric(5, 2) not null,
                  CONSTRAINT fk_disbursements
                  FOREIGN KEY(disbursements_id)
                  REFERENCES disbursements(id),
                  CONSTRAINT fk_orders
                  FOREIGN KEY(order_id)
                  REFERENCES orders(id)
              );
          `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS disbursements_orders;');
  }
}
