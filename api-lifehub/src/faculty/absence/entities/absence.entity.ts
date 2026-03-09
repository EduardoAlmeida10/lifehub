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

  @Column({
    type: 'date',
    transformer: {
      to: (value: Date) => {
        if (!value) return value;
        // Extrai YYYY-MM-DD usando métodos UTC (não local)
        const year = value.getUTCFullYear();
        const month = String(value.getUTCMonth() + 1).padStart(2, '0');
        const day = String(value.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
      from: (value: string) => {
        if (!value) return value;
        return new Date(value + 'T00:00:00.000Z');
      },
    },
  })
  date: Date;

  @Column()
  present: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
