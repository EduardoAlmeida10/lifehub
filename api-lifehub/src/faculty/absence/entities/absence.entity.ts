import { CourseEntity } from 'src/faculty/course/entities/course.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('absences')
export class AbsenceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CourseEntity, (course) => course.absences, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId' })
  course: CourseEntity;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  present: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
