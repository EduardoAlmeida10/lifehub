import { IsEnum, IsNumber, IsUUID, Max, Min } from 'class-validator';
import { GradeType } from '../enums/grade-type.enum';

export class CreateGradeDto {
  @IsUUID()
  courseId: string;

  @IsEnum(GradeType)
  type: GradeType;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(10)
  value: number;
}
