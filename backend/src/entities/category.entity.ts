import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Event } from "./event.entity.ts";
import { User } from "./user.entity.ts";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  category_name!: string;

  @Column({ nullable: true })
  description!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Event, (event) => event.category)
  events!: Event[];

  @OneToMany(() => User, (user) => user.favorite_category)
  users!: User[];
}
