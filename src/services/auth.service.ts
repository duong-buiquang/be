import { inject, injectable } from 'inversify';
import { ObjectLiteral } from 'typeorm';
import { User } from '../entities/User.entity';
import UserRepository from '../repositories/user.repository';
import { comparePassword, hashPassword } from '../utils/helper';

@injectable()
export default class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async authenticate(
    email: string,
    password: string
  ): Promise<ObjectLiteral | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    if (
      !comparePassword(
        hashPassword(password, process.env.JWT_SECRET || ''),
        user.password
      )
    ) {
      return null;
    }
    return user;
  }
}
