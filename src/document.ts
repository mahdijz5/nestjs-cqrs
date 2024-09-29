import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupDocument(app: INestApplication, route: string) {
    const configDocument = new DocumentBuilder()
        .setTitle('Todo list')
        .setDescription('API Gateway')
        .setVersion('1.0')
        .addBearerAuth({
            type: 'http',
            bearerFormat: 'JWT',  
            scheme: 'bearer',
            in: 'header', 
        })
        .build();
    const document = SwaggerModule.createDocument(app, configDocument);
    SwaggerModule.setup(route, app, document);
}
