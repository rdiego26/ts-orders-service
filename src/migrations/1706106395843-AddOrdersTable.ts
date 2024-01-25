import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrdersTable1706106395843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
          create table if not exists orders
            (
                id         text                                   not null primary key,
                merchant_reference text                           not null,
                amount  numeric(5, 2) not null default 0.0,
              created_at  date not null default NOW(),
              CONSTRAINT fk_merchant
              FOREIGN KEY(merchant_reference)
              REFERENCES merchants(reference)
            );
          `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS orders;');
  }
}
