import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { LoggerModule } from './common/logger';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TodoListModule } from './todo-list/todo-list.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    LoggerModule,
    UserModule,
    TodoListModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
