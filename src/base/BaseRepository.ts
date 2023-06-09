import { injectable } from 'inversify';
import {
  EntityTarget,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

import { AppDataSource } from '../app';

@injectable()
export class BaseRepository<T extends ObjectLiteral> {
  protected readonly repository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.repository = AppDataSource.getRepository(entity);
  }

  async create(data: T): Promise<T> {
    return await this.repository.save(data);
  }

  async findOne(constraintWhere: any): Promise<T | null> {
    return await this.repository.findOneBy(constraintWhere);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  // async update(id: number, data: Partial<T>): Promise<T | null> {
  //   await this.repository.update(id, data);
  //   return await this.repository.findOneBy({ id });
  // }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
