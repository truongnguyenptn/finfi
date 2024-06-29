import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get<ConfigService>(ConfigService);

    if (config.get('NODE_ENV') === 'development') {
        app.enableCors();
    }

    app.use(helmet());
    app.useGlobalInterceptors(new ResponseInterceptor());

    await app.listen(5050);
}
bootstrap();
