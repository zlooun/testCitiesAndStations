import { IsNotEmpty, IsString, IsUUID, MaxLength, ValidateIf, } from 'class-validator';

export class UpdateCityDto {
  @IsNotEmpty()
  @IsUUID("4")
  readonly id: string;

  @ValidateIf(o => o.name !== undefined)
  @IsString()
  @MaxLength(36)
  readonly name: string;

  @ValidateIf(o => o.phone !== undefined)
  @IsString()
  @MaxLength(18)
  readonly phone: number;
}