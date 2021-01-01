import { IsNotEmpty, IsUUID, } from 'class-validator';

export class DeleteCityDto {
  @IsNotEmpty()
  @IsUUID("4")
  readonly id: string;
}