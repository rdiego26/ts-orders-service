import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    name: 'full_name',
    nullable: false,
  })
  fullName!: string;

  @Column({
    nullable: false,
  })
  password!: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email!: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;
}
