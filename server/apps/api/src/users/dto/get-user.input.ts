import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class GetUserInput {
  @Field()
  @IsString()
  readonly _id: string;
}
