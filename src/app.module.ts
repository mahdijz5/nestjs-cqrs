import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { LoggerModule } from './common/logger';
import { UserModule } from './user/user.module';

@Module({
  imports: [  
    DatabaseModule,
    LoggerModule,
    UserModule,
  ],
  controllers: [ ],
  providers: [],
})
export class AppModule { }
