import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { contextMiddleware } from '../../middleware';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users';
import { AppResolver } from './app.resolver';
import { join } from 'path';
import { PartsModule } from '../parts';

@Module({
    imports: [
        UsersModule,
        PartsModule,
        MongooseModule.forRoot('mongodb://localhost:27017', { dbName: 'allTerrain' }),
        ConfigModule.forRoot({ isGlobal: true }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: true,
            autoSchemaFile: join(process.cwd(), 'schemas/schema.gql'),
        })
    ],
    controllers: [],
    providers: [AppResolver],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer.apply(contextMiddleware).forRoutes('*');
    }
}