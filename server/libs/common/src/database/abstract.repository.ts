import { FilterQuery, Model, Types } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export class AbstractRepository<TDocument extends AbstractDocument> {
  protected readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDoc = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDoc.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = (await this.model.findOne(
      filterQuery,
      {},
      { lean: true },
    )) as TDocument;
    if (!document) {
      this.logger.warn('Document not found with filter query.', filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }

  async update(
    filterQuery: FilterQuery<TDocument>,
    updateQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const document = (await this.model.findOneAndUpdate(
      filterQuery,
      updateQuery,
      { lean: true },
    )) as TDocument;
    if (!document) {
      this.logger.warn('Document not found with update query.', filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }
}
