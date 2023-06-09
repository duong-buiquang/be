import {
  EntityTarget,
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { AppDataSource } from '../app';

export default class Db<T extends ObjectLiteral> {
  async findOneBy(email: string) {
    return await this._db.findOne({
      where: { email },
    } as unknown as FindOptionsWhere<T>);
  }
  private _db: Repository<T>;
  constructor(target: EntityTarget<T>) {
    this._db = AppDataSource.getRepository(target);
  }

  async update(product: any) {
    return await this._db.save(product);
  }

  async findAll(options = null) {
    return await this._db.find(options as unknown as FindManyOptions<T>);
  }

  async create(newData: T) {
    return await this._db.save(newData);
  }

  async findOneById(id: any) {
    return await this._db.findOne({ where: { id } });
  }

  async countTotal(options = null) {
    return await this._db.count(options as unknown as FindManyOptions<T>);
  }

  // findOne() {
  //   return this._db.findOne();
  // }
}
