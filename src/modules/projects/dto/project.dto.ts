import { IsDate, IsDateString, IsString } from 'class-validator';
import { isDate } from 'moment';

// crete project dto
export class CreateProjectDto {
  @IsString()
  projectName: string;

  @IsDateString('YYYY-MM-DD')
  start_date: string;

  @IsDateString('YYYY-MM-DD')
  end_date: string;
}
