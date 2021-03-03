import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Event } from "./event.entity";
import { User } from "./user.entity";

export enum Status {
  BOOKED = "Booked",
  ATTENDED = "Attended",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  event_id!: number;

  @Column()
  user_id!: number;

  @Column()
  order_number!: string;

  @Column()
  qty!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  total_price!: number;

  @Column()
  event_date!: Date;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.BOOKED,
  })
  status!: Status;

  @Column({ nullable: true })
  attended_date!: Date;

  @ManyToOne(() => Event, (event) => event.id)
  @JoinColumn({ name: "event_id" })
  event!: Event;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
