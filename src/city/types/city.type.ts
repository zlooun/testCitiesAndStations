import { Field, ID, ObjectType, Int } from '@nestjs/graphql';

@ObjectType('City')
export class CityType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  phone: number;
}
