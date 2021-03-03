import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./category.entity";
import { Order } from "./order.entity";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  event_name!: string;

  @Column()
  poster!: string;

  @Column()
  location!: string;

  @Column("text")
  description!: string;

  @Column()
  event_date!: Date;

  @Column()
  category_id!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  ticket_price!: number;

  @Column({ default: 0 })
  total_ticket!: number;

  @Column({ default: 0 })
  sold_ticket!: number;

  @ManyToOne(() => Category, (cat) => cat.events)
  @JoinColumn({ name: "category_id" })
  category!: Category;

  @OneToMany(() => Order, (order) => order.event)
  order!: Order[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
