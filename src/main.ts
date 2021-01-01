'use strict';

/**
 * Server initialization
 */

/**
 * Dependencies
 */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    appOptions,
  );

  app.setGlobalPrefix('/api');

  await app.listen(
    app.get('ConfigService').get('PORT'),
    app.get('ConfigService').get('HOST'),
  );
}

bootstrap();
