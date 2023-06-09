import UserRepository from '../repositories/user.repository';
import { injectable } from 'inversify';
import { FindOptionsWhere, ObjectLiteral } from 'typeorm';
import { User } from '../entities/User.entity';

@injectable()
export default class UserService {
  constructor(protected readonly userRepository: UserRepository) {}

  async findOneByEmail(email: string): Promise<ObjectLiteral | null> {
    return await this.userRepository.findByEmail(email);
  }

  sayHello() {
    return 'hello world';
  }

  async findAll(): Promise<ObjectLiteral[]> {
    return await this.userRepository.findAll();
  }

  async createUser(user: User) {
    return await this.userRepository.createUser(user);
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneById(id);
  }
  // async findOneByEmail(email: string): Promise<User | null> {
  //   return await this.repository.findByEmail(email);
  // }

  // async login(email: string, password: string) {
  //   const account = await this.repository.findOne({ email });
  //   console.log('account', account);
  //   return;
  // }
}
