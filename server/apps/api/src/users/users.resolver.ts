import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './model/user.model';
import { GetUserInput } from './dto/get-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const updatedUser = await this.usersService.update(updateUserInput);
    await pubSub.publish('userUpdated', { userUpdated: updatedUser });
    return updatedUser;
  }

  @Query(() => User, { name: 'user' })
  async getUser(@Args() getUserArgs: GetUserInput) {
    return await this.usersService.findOne(getUserArgs);
  }

  @Subscription(() => User)
  userUpdated() {
    return pubSub.asyncIterator('userUpdated');
  }
}
