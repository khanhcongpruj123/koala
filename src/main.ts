import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { KoalaExceptionFilter } from './base/error.handler';
import * as mqtt from './providers/mqtt';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public', {
    prefix: '/public/',
  });
  app.useGlobalFilters(new KoalaExceptionFilter());

  // check ory connection
  console.log(`Check connection to Ory ${process.env.ORY_SDK_URL}`);

  mqtt.client.on('connect', () => {
    console.log('MQTT Connected!');
    console.log(`MQTT host: ${mqtt.client.options.host}`);
  });

  await app.listen(3000);
}
bootstrap();
