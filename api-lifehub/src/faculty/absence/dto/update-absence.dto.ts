import { IsBoolean, IsDateString, IsOptional } from 'class-validator';
import { IsNotFutureDate } from 'src/common/validators/is-not-future-date.validator';

export class UpdateAbsenceDto {
  @IsOptional()
  @IsDateString()
  @IsNotFutureDate()
  date?: string;

  @IsOptional()
  @IsBoolean()
  present?: boolean;
}
