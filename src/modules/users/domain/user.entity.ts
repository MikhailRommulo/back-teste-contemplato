/* istanbul ignore file */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ length: 30 })
  userName: string;

  @Column()
  hashPassword: string;
}
