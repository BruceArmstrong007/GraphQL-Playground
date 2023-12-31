import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  readonly username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  readonly password: string;
}
