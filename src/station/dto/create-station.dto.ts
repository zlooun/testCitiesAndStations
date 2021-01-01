import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateStationDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(36)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(36)
  readonly cityName: string;
}
