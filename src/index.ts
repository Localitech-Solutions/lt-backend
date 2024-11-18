import { AppModule } from './modules/app';
import { setupSwagger } from './utils';
import { ConfigService } from '@nestjs/config';
import { Reflector, NestFactory } from '@nestjs/core';
import { HttpExceptionFilter, QueryFailedFilter } from './filters';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as RateLimit from 'express-rate-limit';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(),
        { cors: true },
    );

    app.enable('trust proxy');
    app.use(helmet.default({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false }));
    app.use(RateLimit.default({ windowMs: 15 * 60 * 1000, max: 200 }));
    app.use(compression());
    app.use(morgan('combined'));
    app.setGlobalPrefix('lt');

    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
    app.useGlobalFilters(new HttpExceptionFilter(reflector), new QueryFailedFilter(reflector));
    app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          transform: true,
          dismissDefaultMessages: true,
          validationError: { target: false },
        }),
    );

    setupSwagger(app);
    const configService = app.get(ConfigService);
    await app.listen(3000);
}

void bootstrap();