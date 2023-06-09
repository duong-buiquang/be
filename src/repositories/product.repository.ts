import { BaseRepository } from '../base/BaseRepository';
import { User } from '../entities/User.entity';
import { injectable } from 'inversify';
import { Product } from '../entities/Product.entity';
import Db from '../database/Db';

@injectable()
export default class ProductRepository {
  private repository;
  constructor() {
    this.repository = new Db(Product);
  }

  async getProducts(options = null) {
    return this.repository.findAll(options);
  }

  async create(product: any) {
    return await this.repository.create(product);
  }

  async getProduct(id: any) {
    return await this.repository.findOneById(id);
  }

  async update(product: any) {
    return await this.repository.update(product);
  }

  async countTotal() {
    return await this.repository.countTotal();
  }
}
