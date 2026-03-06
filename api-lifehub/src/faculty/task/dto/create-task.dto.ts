import {
  IsEnum,
  IsString,
  IsNotEmpty,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskPriority } from '../enums/task-priority.enum';

export class CreateTaskDto {
  @IsUUID()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  dueDate: string;

  @IsEnum(TaskStatus)
  status: TaskStatus = TaskStatus.PENDING;

  @IsEnum(TaskPriority)
  priority: TaskPriority = TaskPriority.MEDIUM;
}
