import { NotFoundException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import {
  FilterQuery,
  FlattenMaps,
  Model,
  Require_id,
  SortOrder,
  UpdateQuery,
} from 'mongoose';

import { EntitySchemaFactory } from './entity-schema.factory';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { RootFilterQuery } from 'mongoose';
import { ERROR } from '../enums';

export abstract class EntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot
> {
  constructor(
    protected readonly entityModel: Model<TSchema>,
    protected readonly entitySchemaFactory: EntitySchemaFactory<
      TSchema,
      TEntity
    >,
  ) { }

  protected async findOne(
    entityFilterQuery?: FilterQuery<TSchema>,
  ): Promise<TEntity> {
    const entityDocument = await this.entityModel.findOne(
      entityFilterQuery,
      {},
      { lean: true },
    );

    if (!entityDocument) {
      throw new NotFoundException('Entity was not found.');
    }

    return this.entitySchemaFactory.createFromSchema(entityDocument);
  }

  protected async find(
    entityFilterQuery?: FilterQuery<TSchema>,
    sort?: string | { [key: string]: SortOrder | { $meta: any; }; } | [string, SortOrder][] | undefined | null
  ): Promise<TEntity[]> {
    return (
      await this.entityModel.find(entityFilterQuery, {}, { lean: true })
        .sort(sort)
    ).map(entityDocument =>
      this.entitySchemaFactory.createFromSchema(entityDocument),
    );
  }

  async create(entity: TEntity): Promise<void> {
    await new this.entityModel(this.entitySchemaFactory.create(entity)).save();
  }

  async remove(filter: RootFilterQuery<TSchema>): Promise<TEntity> {
    const entity = await this.findOne(filter)
    if (!entity) throw new NotFoundException(ERROR.NOT_FOUND)
    await this.entityModel.deleteOne(filter);
    return entity
  }

  async updateOne(filter: RootFilterQuery<TSchema>, updateQuery: UpdateQuery<TSchema>): Promise<TEntity> {
    const entity = await this.findOne(filter)
    if (!entity) throw new NotFoundException(ERROR.NOT_FOUND)
    await this.entityModel.updateOne(filter, updateQuery);
    return this.entitySchemaFactory.createFromSchema(entity)
  }

  async updateMany(filter: RootFilterQuery<TSchema>, updateQuery: UpdateQuery<TSchema>): Promise<TEntity[]> {
    const entities = await this.find(filter)
    await this.entityModel.updateMany(filter, updateQuery);
    return entities.map(item => this.entitySchemaFactory.createFromSchema(item))
  }

}
