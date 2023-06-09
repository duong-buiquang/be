import { FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { BaseRepository } from './BaseRepository';
import { autoInjectable } from 'tsyringe';
import { User } from '../entities/User.entity';
import { injectable } from 'inversify';

@injectable()
export class BaseService<T extends ObjectLiteral> {
  protected readonly repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  async create(data: T): Promise<T> {
    return await this.repository.create(data);
  }

  async findOne(id: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.repository.findOne(id);
    if (!entity) {
      throw new Error('Entity not found');
    }
    return entity;
  }

  async findAll(): Promise<T[]> {
    return await this.repository.findAll();
  }

  async findOneByEmail(email: string) {
    const constraint = { where: { email } };
    return await this.repository.findOne(constraint);
  }

  // async update(id: number, data: Partial<T>): Promise<T> {
  //   const entity = await this.repository.findOne(id);
  //   if (!entity) {
  //     throw new Error('Entity not found');
  //   }
  //   return await this.repository.update(id, data);
  // }

  // async delete(id: number): Promise<void> {
  //   const entity = await this.repository.findOne(id);
  //   if (!entity) {
  //     throw new Error('Entity not found');
  //   }
  //   await this.repository.delete(id);
  // }
}
