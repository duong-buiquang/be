import { injectable } from 'inversify';
import { FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { BaseService } from './BaseService';

export class BaseController<T extends ObjectLiteral> {
  protected readonly service: BaseService<T>;

  constructor(service: BaseService<T>) {
    this.service = service;
  }

  async create(data: T): Promise<T> {
    return await this.service.create(data);
  }

  async findOne(id: FindOptionsWhere<T>): Promise<T> {
    return await this.service.findOne(id);
  }

  async findAll(): Promise<T[]> {
    return await this.service.findAll();
  }

  // async update(id: number, data: Partial<T>): Promise<T> {
  //   return await this.service.update(id, data);
  // }

  // async delete(id: number): Promise<void> {
  //   await this.service.delete(id);
  // }
}
