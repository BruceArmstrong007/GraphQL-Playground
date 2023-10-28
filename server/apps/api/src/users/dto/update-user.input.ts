import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly _id: string;

  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  @IsOptional()
  readonly name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  @IsOptional()
  readonly username: string;
}
