import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { IStation } from './interfaces/station.interfaces';
import { CreateStationDto } from './dto/create-station.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Stations } from './entities/station.entity';
import { CityService } from 'src/city/city.service';
import { UpdateStationDto } from './dto/update-station.dto';
import { DeleteStationDto } from './dto/delete-station.dto';

@Injectable()
export class StationService {
  hmacSecret = this.configService.get('HMAC_SECRET');
  hmacTransactionPath = this.configService.get('HMAC_TRANSACTION_PATH');
  hmacAlgorithm = this.configService.get('HMAC_ALGORITHM');

  constructor(
    @InjectRepository(Stations)
    private StationsRepository: Repository<Stations>,
    private configService: ConfigService,
    private cityService: CityService,
  ) {}

  async find(name: string): Promise<IStation|null> {
    try {
      const station = await this.StationsRepository.findOne({ name });

      if (!station) {
        throw new NotFoundException("Station has not been found");
      }

      return station;
    } catch (error) {
      throw new HttpException(error, HttpStatus.PAYMENT_REQUIRED);
    }
  }

  async create(createStationDto: CreateStationDto): Promise<IStation> {
    const city = await this.cityService.find(createStationDto.cityName);

    const saveStation: DeepPartial<Stations> = {
      name: createStationDto.name,
      city: city.name
    }

    try {
      const savedStation = await this.StationsRepository.save(saveStation);

      return savedStation;
    } catch (error) {
      throw new HttpException(error, HttpStatus.PAYMENT_REQUIRED);
    }
  }

  async update(updateStationDto: UpdateStationDto): Promise<IStation> {
    const saveStation: QueryDeepPartialEntity<Stations> = {};
    
    if (updateStationDto.name !== undefined) {
      saveStation.name = updateStationDto.name;
    }
    
    if (updateStationDto.cityName !== undefined) {
      const city = await this.cityService.find(updateStationDto.cityName);

      saveStation.city = city.name;
    }

    if (Object.keys(saveStation).length === 0) {
      throw new HttpException("Update data is empty", HttpStatus.PAYMENT_REQUIRED);
    }

    try {
      const result = await this.StationsRepository.update({id: updateStationDto.id}, saveStation);
      
      if (result.affected === 0) {
        throw new NotFoundException("Station has not been found");
      }

      const savedCity = this.StationsRepository.findOne({id: updateStationDto.id})

      return savedCity;
    } catch (error) {
      throw new HttpException(error, HttpStatus.PAYMENT_REQUIRED);
    }
  }

  async delete(deleteStationDto: DeleteStationDto): Promise<boolean> {
    try {
      const result = await this.StationsRepository.delete({ id: deleteStationDto.id});
      
      if (result.affected === 0) {
        throw new NotFoundException("Station has not been found");
      }

      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.PAYMENT_REQUIRED);
    }
  }
}
