import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { StationService } from './station.service';
import { StationType } from './types/station.type';

@Resolver(() => StationType)
export class StationResolver {
  constructor(private stationService: StationService) {}

  @Query(() => StationType, { nullable: true })
  findStation(@Args('name') name: string) {
    return this.stationService.find(name);
  }

  @Mutation(() => StationType)
  createStation(
    @Args('name') name: string,
    @Args('cityName') cityName: string,
  ) {
    return this.stationService.create({
      name,
      cityName,
    });
  }

  @Mutation(() => StationType)
  updateStation(
    @Args('id', { nullable: false }) id: string,
    @Args('name', { nullable: true }) name: string,
    @Args('cityName', { nullable: true }) cityName: string,
  ) {
    return this.stationService.update({
      id,
      name,
      cityName,
    });
  }

  @Mutation(() => Boolean)
  deleteStation(@Args('id', { nullable: false }) id: string) {
    return this.stationService.delete({
      id,
    });
  }
}
