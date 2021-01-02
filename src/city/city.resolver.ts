import { Resolver, Query, Args, Mutation, Int } from "@nestjs/graphql";
import { StationType } from "src/station/types/station.type";
import { CityService } from "./city.service";
import { CityType } from "./types/city.type";

@Resolver(() => CityType)
export class CityResolver {
  constructor(
    private cityService: CityService
  ){}

  @Query(() => CityType, { nullable: true })
  findCity(
    @Args("name") name: string
  ) {
    return this.cityService.find(name);
  }

  @Mutation(() => CityType)
  createCity(
    @Args("name") name: string,
    @Args("phone", { type: () => Int }) phone: number
  ) {
    return this.cityService.create({
      name,
      phone
    });
  }

  @Mutation(() => CityType)
  updateCity(
    @Args("id", { nullable: false} ) id: string,
    @Args("name", { nullable: true} ) name: string,
    @Args("phone", { type: () => Int, nullable: true} ) phone: number
  ) {
    return this.cityService.update({
      id,
      name,
      phone
    });
  }

  @Mutation(() => Boolean)
  deleteCity(
    @Args("id", { nullable: false }) id: string,
  ) {
    return this.cityService.delete({
      id
    });
  }

  @Query(() => [StationType], { nullable: true })
  getStationsByCity(
    @Args("name") name: string
  ) {
    return this.cityService.getStationsByCity(name);
  }
}