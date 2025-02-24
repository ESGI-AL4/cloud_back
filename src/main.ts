import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function startApplication() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: 'https://front-cloud-project.web.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 8080);
  console.log("App listening on localhost:" + (process.env.PORT ?? 8080))
}

startApplication();