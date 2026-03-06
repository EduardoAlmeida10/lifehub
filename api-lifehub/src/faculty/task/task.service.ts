import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskEntity } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { CourseEntity } from '../course/entities/course.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async create(dto: CreateTaskDto, userId: string): Promise<TaskEntity> {
    const course = await this.courseRepository.findOne({
      where: { id: dto.courseId, user: { id: userId } },
    });

    if (!course) {
      throw new NotFoundException('Course not found or you do not have access');
    }

    const task = this.taskRepository.create({
      ...dto,
      course,
    });

    return this.taskRepository.save(task);
  }

  async findAll(userId: string): Promise<TaskEntity[]> {
    return this.taskRepository.find({
      where: { course: { user: { id: userId } } },
      relations: ['course'],
      order: { dueDate: 'ASC' },
    });
  }

  async findByCourse(courseId: string, userId: string): Promise<TaskEntity[]> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId, user: { id: userId } },
    });

    if (!course) {
      throw new NotFoundException('Course not found or you do not have access');
    }

    return this.taskRepository.find({
      where: { course: { id: courseId } },
      order: { dueDate: 'ASC' },
    });
  }

  async findOne(id: string, userId: string): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: { id, course: { user: { id: userId } } },
      relations: ['course'],
    });

    if (!task) {
      throw new NotFoundException('Task not found or you do not have access');
    }

    return task;
  }

  async update(
    id: string,
    dto: UpdateTaskDto,
    userId: string,
  ): Promise<TaskEntity> {
    const task = await this.findOne(id, userId);

    if (dto.courseId && dto.courseId !== task.course.id) {
      const newCourse = await this.courseRepository.findOne({
        where: { id: dto.courseId, user: { id: userId } },
      });

      if (!newCourse) {
        throw new NotFoundException(
          'New course not found or you do not have access',
        );
      }

      task.course = newCourse;
    }

    Object.assign(task, dto);

    return this.taskRepository.save(task);
  }

  async remove(id: string, userId: string): Promise<TaskEntity> {
    const task = await this.findOne(id, userId);
    return this.taskRepository.remove(task);
  }
}
