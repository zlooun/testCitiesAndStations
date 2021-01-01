import { IsNotEmpty, IsString, MaxLength, IsNumber} from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(36)
  readonly name: string;

  @IsNumber()
  @MaxLength(18)
  readonly phone: number;
}
