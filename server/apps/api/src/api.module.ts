import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { MongoDBModule } from '@app/common';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        CLIENT_URI1: Joi.string().required(),
        CLIENT_URI2: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        MAIL_SERVICE: Joi.string().required(),
        MAIL_HOST: Joi.string().required(),
        MAIL_PORT: Joi.string().required(),
        MAIL_EMAIL: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        MAIL_FROM: Joi.string().required(),
        VERFIY_TOKEN_TIME: Joi.string().required(),
        HASH_SALT: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        MONGODB_PASS: Joi.string().required(),
        MONGODB_NAME: Joi.string().required(),
        FIREBASE_API_KEY: Joi.string().required(),
        FIREBASE_PROJECT_ID: Joi.string().required(),
        FIREBASE_STORAGE_BUCKET: Joi.string().required(),
      }),
    }),
    UsersModule,
    MongoDBModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
