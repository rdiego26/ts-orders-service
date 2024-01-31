import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsersTable1706363986569 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table if not exists users
          (
              id            uuid                                   not null
              constraint users_pk
              primary key,
              full_name     varchar(150)                           not null,
              email         varchar(100)                           not null
              constraint users_email_unique                        unique,
              created_at    timestamp with time zone default now() not null,
              password      text                                not null
          );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS users;');
  }
}
