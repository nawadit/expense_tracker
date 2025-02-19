import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Expense} from "./Expense" 

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  hash!: string;

  @OneToMany(() => Expense, (expense) => expense.owner)
  expenses!: Expense[];
}
