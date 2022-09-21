import { IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  typeName: string;

  @IsString()
  color: string;
}
