import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order.entity';
import { Product } from './Product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  orderId!: number;

  @Column()
  productId!: number;

  @Column()
  quantity!: number;

  @Column()
  unitPrice!: number;

  @Column()
  totalPrice!: number;

  @ManyToOne(() => Order, (order) => order.id)
  order!: Order;

  @ManyToOne(() => Product, (product) => product.id)
  product!: Product;
}
