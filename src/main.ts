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
  // TODO check ory connection here

  await checkMQTTConnection();

  const PORT = 3000 | Number.parseInt(process.env.PORT);

  console.log('Server starting....');
  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

async function checkMQTTConnection() {
  return new Promise<boolean>((resolve, reject) => {
    mqtt.client.on('connect', () => {
      console.log('MQTT Connected!');
      console.log(`MQTT host: ${mqtt.client.options.host}`);
      resolve(true);
    });
    mqtt.client.on('error', () => {
      console.log('MQTT connection is error!');
      reject(false);
    });
  });
}

bootstrap();
