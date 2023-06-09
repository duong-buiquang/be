import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from './OrderItem.entity';
import { User } from './User.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  orderDate!: Date;

  @Column()
  orderStatus!: string;

  @Column()
  customerId!: number;

  @Column()
  shippingAddressId!: number;

  @Column()
  billingAddressId!: number;

  @OneToOne(() => User)
  customer!: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.orderId)
  orderItems!: OrderItem[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;
}
