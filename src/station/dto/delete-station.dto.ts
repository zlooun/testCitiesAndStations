import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteStationDto {
  @IsNotEmpty()
  @IsUUID('4')
  readonly id: string;
}
