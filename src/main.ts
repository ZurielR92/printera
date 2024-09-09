import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Printera App')
    .setDescription('Control total para la gestion de producción, reprocesos e inventarios en la industria gráfica')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const customCss = `
    .request-url { 
      display: none !important; 
    }
    .curl-command { 
      display: none !important; 
    }
  `;


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCss,
    swaggerOptions:{ 
    }
  });






  await app.listen(3000);
}
bootstrap();
