import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class UpdateStationDto {
  @IsNotEmpty()
  @IsUUID('4')
  readonly id: string;

  @ValidateIf(o => o.name !== undefined)
  @IsNotEmpty()
  @IsString()
  @MaxLength(36)
  readonly name: string;

  @ValidateIf(o => o.cityName !== undefined)
  @IsNotEmpty()
  @IsString()
  @MaxLength(36)
  readonly cityName: string;
}
