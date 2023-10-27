import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { GetUserInput } from './dto/get-user.input';
import { UserDocument } from './model/user.schema';
import { User } from './model/user.model';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly config: ConfigService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    await this.validateCreateUser(createUserInput);
    const newUser = await this.userRepo.create({
      ...createUserInput,
      password: await bcrypt.hash(
        createUserInput.password,
        Number(this.config.get('HASH_SALT')),
      ),
    });

    return this.toModel(newUser);
  }

  async toModel(userDoc: UserDocument): Promise<User> {
    return {
      _id: userDoc._id.toHexString(),
      email: userDoc.email,
      name: userDoc.name,
      username: userDoc.username,
    };
  }

  async validateCreateUser(createUserInput: CreateUserInput) {
    try {
      await this.userRepo.findOne({ email: createUserInput.email });
      throw new UnprocessableEntityException('Email already registered.');
    } catch (err) {}
  }

  async findOne(getUserArgs: GetUserInput) {
    const userDoc = await this.userRepo.findOne(getUserArgs);
    return this.toModel(userDoc);
  }
}
