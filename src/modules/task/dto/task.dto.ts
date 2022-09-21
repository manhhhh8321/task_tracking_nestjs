import { IsDateString, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  taskName: string;

  @IsString()
  assignee: string;

  @IsString()
  project: string;

  @IsString()
  status: string;

  @IsString()
  type: string;

  @IsString()
  priority: string;

  @IsString()
  @IsDateString('YYYY-MM-DD')
  end_date: string;

  @IsString()
  @IsDateString('YYYY-MM-DD')
  start_date: string;
}
