import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  timestamp!: Date;

  @ManyToOne(() => User, (user) => user.expenses, { onDelete: "CASCADE" })
  @JoinColumn({ name: "owner_id" })
  owner!: User;
}
