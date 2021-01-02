import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { CityModule } from './city/city.module';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
import { StationModule } from './station/station.module';

const NODE_ENV = process.env.NODE_ENV || 'development';
const TYPE_ENV = process.env.TYPE_ENV || 'local';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./assets/.env.${NODE_ENV}.${TYPE_ENV}`,
      isGlobal: true,
      expandVariables: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    TypeOrmModule.forRoot(),
    CityModule,
    StationModule,
    RouterModule.forRoutes(routes),
  ],
})
export class AppModule {}
