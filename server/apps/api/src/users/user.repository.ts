import { AbstractRepository } from '@app/common';
import { UserDocument } from './model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.model';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(UserRepository.name);
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel)
  }


}
