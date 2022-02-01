import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

require('dotenv').config();

const PORT = parseInt(process.env.PORT, 10);



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Microservice')
    .setDescription('The MS provider for Department and Employee')
    .setVersion('1.0')
    .addTag('department')
    .addTag('employee')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('MS', app, document);

  console.log('port', PORT);
  await app.listen(PORT, () => {
    console.log(`Microservice running on http://localhost:${PORT}`);
    console.log(`For swagger documented url http://localhost:${PORT}/MS`);
  });
}
bootstrap();
