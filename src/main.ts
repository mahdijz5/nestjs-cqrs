import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupDocument } from './document';
import { ResponseInterceptor } from './common/interceptors';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import {exceptionFactory} from './common/utils';

const logger = new Logger('----- Todo List -----');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api"); 
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(
      new ValidationPipe({
          whitelist: true,
          transform: true,
          exceptionFactory,
      }), 
  );

  setupDocument(app, "docs")
  await app.listen(3000);

  logger.verbose('Running ...');

}
bootstrap();
