import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("FieldCityOfStation")
export class FieldCityOfStationType {

  @Field(() => ID)
  id: string

  @Field()
  name: string;
}

@ObjectType("Station")
export class StationType {

  @Field(() => ID)
  id: string

  @Field()
  name: string;

  @Field()
  city: string;
}
