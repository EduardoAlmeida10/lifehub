import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { GradeEntity } from './entities/grade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from '../course/entities/course.entity';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(GradeEntity)
    private readonly gradeRepository: Repository<GradeEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async create(dto: CreateGradeDto, userId: string): Promise<GradeEntity> {
    const course = await this.courseRepository.findOne({
      where: { id: dto.courseId, user: { id: userId } },
    });

    if (!course) {
      throw new NotFoundException('Course not found or you do not have access');
    }

    const grade = this.gradeRepository.create({
      ...dto,
      course,
    });

    return this.gradeRepository.save(grade);
  }

  async findAll(userId: string): Promise<GradeEntity[]> {
    return this.gradeRepository
      .createQueryBuilder('grade')
      .leftJoinAndSelect('grade.course', 'course')
      .leftJoin('course.user', 'user')
      .where('user.id = :userId', { userId })
      .orderBy('grade.createdAt', 'DESC')
      .getMany();
  }

  async findByCourse(courseId: string, userId: string): Promise<GradeEntity[]> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId, user: { id: userId } },
    });

    if (!course) {
      throw new NotFoundException('Course not found or you do not have access');
    }

    return this.gradeRepository.find({
      where: { course: { id: courseId } },
      order: { type: 'ASC' },
    });
  }

  async findOne(id: string, userId: string): Promise<GradeEntity> {
    const grade = await this.gradeRepository
      .createQueryBuilder('grade')
      .leftJoinAndSelect('grade.course', 'course')
      .leftJoin('course.user', 'user')
      .where('grade.id = :id', { id })
      .andWhere('user.id = :userId', { userId })
      .getOne();

    if (!grade) {
      throw new NotFoundException('Grade not found or you do not have access');
    }

    return grade;
  }

  async findStatistics(courseId: string, userId: string) {
    const course = await this.courseRepository.findOne({
      where: { id: courseId, user: { id: userId } },
    });

    if (!course) {
      throw new NotFoundException('Course not found or you do not have access');
    }

    const grades = await this.gradeRepository.find({
      where: { course: { id: courseId } },
    });

    if (grades.length === 0) {
      return {
        count: 0,
        average: 0,
        highest: 0,
        lowest: 0,
      };
    }

    const values = grades.map((g) => Number(g.value));
    const sum = values.reduce((acc, val) => acc + val, 0);
    const average = sum / values.length;
    const highest = Math.max(...values);
    const lowest = Math.min(...values);

    return {
      count: grades.length,
      average: Number(average.toFixed(2)),
      highest,
      lowest,
    };
  }

  async update(
    id: string,
    dto: UpdateGradeDto,
    userId: string,
  ): Promise<GradeEntity> {
    const grade = await this.findOne(id, userId);

    if (dto.type !== undefined) {
      grade.type = dto.type;
    }

    if (dto.value !== undefined) {
      grade.value = dto.value;
    }

    return this.gradeRepository.save(grade);
  }

  async remove(id: string, userId: string): Promise<void> {
    const grade = await this.findOne(id, userId);
    await this.gradeRepository.remove(grade);
  }
}
