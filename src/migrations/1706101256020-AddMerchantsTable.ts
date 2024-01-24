import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMerchantsTable1706101256020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
          create table if not exists merchants
            (
                id         uuid                                   not null primary key,
                reference text unique                             not null,
                email  text    unique                             not null,
                live_on      date                                 not null,
                disbursement_frequency  text not null,
                minimum_monthly_fee  numeric(2, 1) not null default 0.0
            );
            
            create index if not exists merchants_disbursement_frequency_index
                on merchants (disbursement_frequency);
          `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS merchants;');
  }
}
