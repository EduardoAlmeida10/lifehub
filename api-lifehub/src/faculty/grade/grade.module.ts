import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from './entities/grade.entity';
import { CourseEntity } from '../course/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GradeEntity, CourseEntity])],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
