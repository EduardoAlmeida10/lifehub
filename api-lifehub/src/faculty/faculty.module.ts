import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyController } from './faculty.controller';
import { CourseModule } from './course/course.module';
import { GradeModule } from './grade/grade.module';
import { TaskModule } from './task/task.module';
import { AbsenceModule } from './absence/absence.module';
import { LinkModule } from './link/link.module';
import { EventModule } from './event/event.module';

@Module({
  controllers: [FacultyController],
  providers: [FacultyService],
  imports: [
    CourseModule,
    GradeModule,
    TaskModule,
    AbsenceModule,
    LinkModule,
    EventModule,
  ],
})
export class FacultyModule {}
