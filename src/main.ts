import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './Exception/ErrorHandler';

async function start() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000
  const httpAdapter = app.get(HttpAdapterHost);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('Flower Store')
    .setDescription('REST API')
    .setVersion('1.0.0')
    .addTag('NodeJS, NestJS, PostgreSQL, Sequelize')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.use((req, res, next) => {
    const startTime = Date.now();
    res.on('finish', () => {
      const endTime = Date.now();
      const resTime = endTime - startTime;
      console.log(
        `${req.method} ${req.originalUrl} ${req.statusCode} ${resTime}ms`,
      );
    });
    next();
  })

  app.use(cookieParser());
  await app.listen(PORT, () => {
    console.log(`Server is NOT running on PORT ${PORT}`);
  });
}
start();
