import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './model/user.model';
import { GetUserInput } from './dto/get-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => User, { name: 'user' })
  async getUser(@Args() getUserArgs: GetUserInput) {
    return await this.usersService.findOne(getUserArgs);
  }
}