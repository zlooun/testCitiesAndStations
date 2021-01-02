import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Cities as Cities } from './entities/city.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ICity } from './interfaces/city.interfaces';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DeleteCityDto } from './dto/delete-city.dto';
import { Stations } from 'src/station/entities/station.entity';
import { IStation } from 'src/station/interfaces/station.interfaces';

@Injectable()
export class CityService {
  hmacSecret = this.configService.get('HMAC_SECRET');
  hmacTransactionPath = this.configService.get('HMAC_TRANSACTION_PATH');
  hmacAlgorithm = this.configService.get('HMAC_ALGORITHM');

  constructor(
    @InjectRepository(Cities)
    private CitiesRepository: Repository<Cities>,
    @InjectRepository(Stations)
    private StationsRepository: Repository<Stations>,
    private configService: ConfigService,
  ) {}

  async find(name: string): Promise<ICity|null> {
    try {
      const city = await this.CitiesRepository.findOne({ name });

      if (!city) {
        throw new NotFoundException("City has not been found");
      }

      return city;
    } catch (error) {
      throw new HttpException(error, HttpStatus.PAYMENT_REQUIRED);
    }
  }

  async create(createCityDto: CreateCityDto): Promise<ICity> {
    try {
      const saveCity: DeepPartial<Cities> = {
        name: createCityDto.name,
        phone: +createCityDto.phone,
      };

      const savedCity = await this.CitiesRepository.save(saveCity);

      return savedCity;
    } catch (error) {
      throw new HttpException(error, HttpStatus.PAYMENT_REQUIRED);
    }
  }

  async update(updateCityDto: UpdateCityDto): Promise<ICity> {
    const saveCity: QueryDeepPartialEntity<Cities> = {};
    
    if (updateCityDto.name !== undefined) {
      saveCity.name = updateCityDto.name;
    }
    
    if (updateCityDto.phone !== undefined) {
      saveCity.phone = +updateCityDto.phone;

      if (isNaN(saveCity.phone)) {
        throw new HttpException("Incorrect phone", HttpStatus.PAYMENT_REQUIRED);
      }
    }

    if (Object.keys(saveCity).length === 0) {
      throw new HttpException("Update data is empty", HttpStatus.PAYMENT_REQUIRED);
    }

    let result;

    try {
      result = await this.CitiesRepository.update({id: updateCityDto.id}, saveCity);
    } catch (error) {
      throw new HttpException(error, HttpStatus.PAYMENT_REQUIRED);
    }

    if (result.affected === 0) {
      throw new NotFoundException("City has not been found");
    }

    try {
      const savedCity = this.CitiesRepository.findOne({id: updateCityDto.id})

      return savedCity;
    } catch (error) {
      throw new HttpException(error, HttpStatus.PAYMENT_REQUIRED);
    }
  }

  async delete(deleteCityDto: DeleteCityDto): Promise<boolean> {
    let result;

    try {
      result = await this.CitiesRepository.delete({ id: deleteCityDto.id});
    } catch (error) {
      throw new HttpException(error, HttpStatus.PAYMENT_REQUIRED);
    }

    if (result.affected === 0) {
      throw new NotFoundException("City has not been found");
    }

    return true;
  }

  async getStationsByCity(name: string): Promise<Array<IStation>> {
    const query = this.StationsRepository.createQueryBuilder();

    query.where({ city: name });

    try {
      const cities = await query.getMany();

      return cities;
    } catch (error) {
      throw new HttpException(error, HttpStatus.PAYMENT_REQUIRED);
    }
  }
}
