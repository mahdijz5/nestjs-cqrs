import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserCommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { UserSchema } from './db/user.schema';
import { UserRepository } from './db/user.repository';
import { UserSchemaFactory } from './db/user.schema.factory';
import { UserFactory } from './user.factory';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_EXPIRE } from '../common/constants/jwt.constant';
import { UserQueryHandlers } from './queries';
import { JWTStrategy } from '../common/strategies';
import { UserEventHandlers } from './events';
import {  userSagas } from './sagas/user.saga';
import { SendEmailHandler } from './commands/send-email/send-email.handler';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
          secret: configService.getOrThrow('JWT_SECRET'),
          signOptions: { expiresIn: JWT_EXPIRE },
      }),
      inject: [ConfigService],
  }),
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
    JWTStrategy,
    userSagas,
    ...UserCommandHandlers,
    ...UserQueryHandlers,
    ...UserEventHandlers,
     
  ]
})
export class UserModule { }
