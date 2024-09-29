import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserCommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { UserSchema } from './db/user.schema';
import { UserRepository } from './db/user.repository';
import { UserSchemaFactory } from './db/user.schema.factory';
import { UserFactory } from './user.factory';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema)
      }
    ])
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserSchemaFactory,
    UserFactory,
    ...UserCommandHandlers
  ]
})
export class UserModule { }
