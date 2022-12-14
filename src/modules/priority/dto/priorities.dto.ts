import { IsInt, IsString, Min } from 'class-validator';

export class CreatePriorityDto {
  @IsString()
  priorName: string;

  @IsInt()
  @Min(0)
  orderNumber: string;
}
