import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.entity.ts";
import { Order } from "./order.entity.ts";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  fullname!: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role!: Role;

  @Column({ nullable: true })
  favorite_id!: number;

  @ManyToOne(() => Category, (cat) => cat.users)
  @JoinColumn({ name: "favorite_id" })
  favorite_category!: Category;

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
