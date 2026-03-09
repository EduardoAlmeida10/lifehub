import { IsBoolean, IsDateString, IsUUID } from 'class-validator';
import { IsNotFutureDate } from 'src/common/validators/is-not-future-date.validator';

export class CreateAbsenceDto {
  @IsUUID()
  courseId: string;

  @IsDateString()
  @IsNotFutureDate()
  date: string;

  @IsBoolean()
  present: boolean;
}
