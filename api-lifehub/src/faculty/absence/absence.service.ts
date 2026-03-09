import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { UpdateAbsenceDto } from './dto/update-absence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AbsenceEntity } from './entities/absence.entity';
import { Repository } from 'typeorm';
import { CourseEntity } from '../course/entities/course.entity';
import { parseDate } from 'src/common/utils/date.util';

@Injectable()
export class AbsenceService {
  constructor(
    @InjectRepository(AbsenceEntity)
    private readonly absenceRepository: Repository<AbsenceEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async create(dto: CreateAbsenceDto, userId: string): Promise<AbsenceEntity> {
    const course = await this.courseRepository.findOne({
      where: { id: dto.courseId, user: { id: userId } },
    });

    if (!course) {
      throw new NotFoundException('Course not found or you do not have access');
    }

    const dateObj = parseDate(dto.date);

    const existing = await this.absenceRepository.findOne({
      where: {
        course: { id: dto.courseId },
        date: dateObj,
      },
    });

    if (existing) {
      throw new ConflictException('Absence already registered for this date');
    }

    const absence = this.absenceRepository.create({
      date: dateObj,
      present: dto.present,
      course,
    });

    return this.absenceRepository.save(absence);
  }

  async findAll(userId: string): Promise<AbsenceEntity[]> {
    return this.absenceRepository.find({
      where: { course: { user: { id: userId } } },
      relations: ['course'],
      order: { date: 'DESC' },
    });
  }

  async findByCourse(
    courseId: string,
    userId: string,
  ): Promise<AbsenceEntity[]> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId, user: { id: userId } },
    });

    if (!course) {
      throw new NotFoundException('Course not found or you do not have access');
    }

    return this.absenceRepository.find({
      where: { course: { id: courseId } },
      order: { date: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<AbsenceEntity> {
    const absence = await this.absenceRepository.findOne({
      where: { id, course: { user: { id: userId } } },
      relations: ['course'],
    });

    if (!absence) {
      throw new NotFoundException(
        'Absence not found or you do not have access',
      );
    }

    return absence;
  }

  async findStatistics(courseId: string, userId: string) {
    const course = await this.courseRepository.findOne({
      where: { id: courseId, user: { id: userId } },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const [total, present, absent] = await Promise.all([
      this.absenceRepository.count({ where: { course: { id: courseId } } }),
      this.absenceRepository.count({
        where: { course: { id: courseId }, present: true },
      }),
      this.absenceRepository.count({
        where: { course: { id: courseId }, present: false },
      }),
    ]);

    return {
      total,
      present,
      absent,
    };
  }

  async update(
    id: string,
    dto: UpdateAbsenceDto,
    userId: string,
  ): Promise<AbsenceEntity> {
    const absence = await this.findOne(id, userId);

    if (dto.date !== undefined) {
      absence.date = parseDate(dto.date);
    }

    if (dto.present !== undefined) {
      absence.present = dto.present;
    }

    return this.absenceRepository.save(absence);
  }

  async remove(id: string, userId: string): Promise<void> {
    const absence = await this.findOne(id, userId);
    await this.absenceRepository.remove(absence);
  }
}
