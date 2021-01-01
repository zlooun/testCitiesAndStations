import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationModule } from 'src/station/station.module';
import { CityController } from './city.controller';
import { CityResolver } from './city.resolver';
import { CityService } from './city.service';
import { Cities } from './entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cities]), HttpModule, forwardRef(() => StationModule)],
  providers: [
    CityService,
    CityResolver
  ],
  controllers: [CityController],
  exports: [CityService],
})
export class CityModule {}
