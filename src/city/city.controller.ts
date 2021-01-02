import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CityService } from './city.service';
import { ICity } from './interfaces/city.interfaces';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { DeleteCityDto } from './dto/delete-city.dto';

@Controller()
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async find(@Body('name') name: string): Promise<ICity | null> {
    return await this.cityService.find(name);
  }

  @Post()
  async create(
    @Body('phone', ParseIntPipe) phone,
    @Body() createCityDto: CreateCityDto,
  ): Promise<ICity> {
    return await this.cityService.create(createCityDto);
  }

  @Patch()
  async update(
    @Body('phone', ParseIntPipe) phone,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<ICity> {
    return this.cityService.update(updateCityDto);
  }
  @Delete()
  async delete(@Body() deleteCityDto: DeleteCityDto): Promise<boolean> {
    return this.cityService.delete(deleteCityDto);
  }
}
