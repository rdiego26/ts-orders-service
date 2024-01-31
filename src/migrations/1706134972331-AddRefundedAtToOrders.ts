import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefundedAtToOrders1706134972331 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('alter table orders add column if not exists refunded_at date;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('alter table orders drop column if exists created_at;');
  }
}
