import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function startApplication() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log("App listening on localhost:" + (process.env.PORT ?? 3000))
}

startApplication();