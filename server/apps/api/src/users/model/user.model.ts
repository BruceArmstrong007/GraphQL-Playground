import { AbstractModel } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends AbstractModel {
  @Field()
  readonly name: string;

  @Field()
  readonly email: string;

  @Field()
  readonly username: string;
}
