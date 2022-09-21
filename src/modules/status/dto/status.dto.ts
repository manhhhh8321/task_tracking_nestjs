import { IsInt, IsString, Min } from 'class-validator';

export class createStatusDto {
  @IsString()
  statusName: string;

  @IsInt()
  @Min(0)
  orderNumber: number;
}
