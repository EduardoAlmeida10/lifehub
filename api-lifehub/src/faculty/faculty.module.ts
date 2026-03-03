import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyController } from './faculty.controller';
import { TasksModule } from './tasks/tasks.module';
import { LackModule } from './lack/lack.module';
import { CourseModule } from './course/course.module';
import { GradeModule } from './grade/grade.module';

@Module({
  controllers: [FacultyController],
  providers: [FacultyService],
  imports: [TasksModule, LackModule, CourseModule, GradeModule],
})
export class FacultyModule {}
