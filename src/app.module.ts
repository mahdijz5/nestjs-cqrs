import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { LoggerModule } from './common/logger';

@Module({
  imports: [  
    DatabaseModule,
    LoggerModule,
  ],
  controllers: [ ],
  providers: [],
})
export class AppModule { }
