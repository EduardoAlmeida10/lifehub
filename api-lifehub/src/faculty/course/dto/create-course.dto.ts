import { IsEnum, IsString, IsArray, IsNotEmpty } from 'class-validator';
import { Semester } from '../enums/semester.enum';
import { DayOfWeek } from '../enums/day-of-week.enum';

export class CreateCourseDto {
  @IsEnum(Semester)
  semester: Semester;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  professor: string;

  @IsArray()
  @IsEnum(DayOfWeek, { each: true })
  daysOfWeek: DayOfWeek[];

  @IsString()
  schedule: string;

  @IsString()
  classroom: string;

  @IsString()
  color: string;
}
