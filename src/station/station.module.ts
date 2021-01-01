import { forwardRef, HttpModule, Module } from '@nestjs/common';
//import { StationController } from './station.controller';
import { StationService } from './station.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stations } from './entities/station.entity';
import { CityModule } from 'src/city/city.module';
import { StationResolver } from './station.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Stations]), HttpModule, forwardRef(() => CityModule)],
  providers: [
    StationService,
    StationResolver
  ],
  //controllers: [StationController],
  exports: [
    StationService,
    TypeOrmModule.forFeature([Stations])
  ],
})
export class StationModule {}
