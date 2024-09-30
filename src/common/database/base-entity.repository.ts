import { AggregateRoot } from '@nestjs/cqrs';
import { ObjectId } from 'mongodb';
import { FilterQuery, RootFilterQuery, SortOrder, UpdateQuery } from 'mongoose';
import { EntityRepository } from './entity.repository';

import { IdentifiableEntitySchema } from './identifiable-entity.schema';

export abstract class BaseEntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot
> extends EntityRepository<TSchema, TEntity> {

  async findOneById(id: string): Promise<TEntity> {
    return this.findOne({ _id: new ObjectId(id) } as FilterQuery<TSchema>);
  }

  async findOneByCondition(filter: FilterQuery<TSchema>): Promise<any> {
    return this.findOne({ ...filter });
  }


  async findAll( entityFilterQuery?: FilterQuery<TSchema>, sort?: string | { [key: string]: SortOrder | { $meta: any; }; } | [string, SortOrder][] | undefined | null): Promise<TEntity[]> {
     return this.find(entityFilterQuery,sort);
  }

  async updateOneByCondition(filter: RootFilterQuery<TSchema>, updateQuery: UpdateQuery<TSchema>): Promise<TEntity> {
    return this.updateOne(filter,updateQuery);
  }

  async removeOne(filter: RootFilterQuery<TSchema>): Promise<TEntity> {
    return this.remove({...filter});
  }
}