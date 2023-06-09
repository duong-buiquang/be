import { injectable } from 'inversify';
import ProductRepository from '../repositories/product.repository';

@injectable()
export default class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(options: null | undefined) {
    return await this.productRepository.getProducts(options);
  }

  async createProduct(product: any) {
    return await this.productRepository.create(product);
  }

  async getProduct(id: any) {
    return await this.productRepository.getProduct(id);
  }
  async updateProduct(product: any) {
    return await this.productRepository.update(product);
  }

  async countTotal() {
    return await this.productRepository.countTotal();
  }
}
