import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDisbursementsTable1706142822895 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
          create table if not exists disbursements
          (
              id                 uuid not null
                  constraint disbursements_pk
                      primary key,
              reference          text not null,
              merchant_reference text not null,
              created_at date not null,
                  constraint disbursements_merchants_reference_fk
                      references merchants (reference)
          );


      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS disbursements;');
  }
}
