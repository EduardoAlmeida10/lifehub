import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { GradeType } from '../enums/grade-type.enum';
import { CourseEntity } from 'src/faculty/course/entities/course.entity';

@Entity('grades')
export class GradeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CourseEntity, (course) => course.grades, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;

  @Column({
    type: 'enum',
    enum: GradeType,
  })
  type: GradeType;

  @Column('decimal', { precision: 5, scale: 2 })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
