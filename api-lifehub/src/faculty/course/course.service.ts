import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { RequestUser } from 'src/common/interfaces/request-user.interface';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async create(dto: CreateCourseDto, user: RequestUser): Promise<CourseEntity> {
    try {
      const course = this.courseRepository.create({
        ...dto,
        user: { id: user.userId },
      });

      return await this.courseRepository.save(course);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Os outros métodos NÃO MUDAM (eles já recebem userId: string)
  async findAll(userId: string): Promise<CourseEntity[]> {
    return this.courseRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<CourseEntity> {
    const course = await this.courseRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async update(
    id: string,
    dto: UpdateCourseDto,
    userId: string,
  ): Promise<CourseEntity> {
    const course = await this.findOne(id, userId);

    Object.assign(course, dto);

    return this.courseRepository.save(course);
  }

  async remove(id: string, userId: string) {
    const course = await this.findOne(id, userId);

    return this.courseRepository.remove(course);
  }
}
