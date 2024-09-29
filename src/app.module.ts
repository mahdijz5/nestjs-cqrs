import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { LoggerModule } from './common/logger';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    LoggerModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
