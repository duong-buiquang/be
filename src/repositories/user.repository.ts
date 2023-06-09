import { User } from '../entities/User.entity';
import { injectable } from 'inversify';
import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import Db from '../database/Db';

@injectable()
export default class UserRepository {
  private repository;
  constructor() {
    this.repository = new Db(User);
    console.log('constructor connected');
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy(email);
  }
  async sayHello() {
    console.log('hello');
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async createUser(user: User) {
    return await this.repository.create(user);
  }

  async findOneById(id: number) {
    return await this.repository.findOneById(id);
  }
}
