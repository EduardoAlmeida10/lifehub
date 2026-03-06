import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { CourseEntity } from '../course/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, CourseEntity])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
