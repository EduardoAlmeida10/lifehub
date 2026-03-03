import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { DayOfWeek } from '../enums/day-of-week.enum';
import { Semester } from '../enums/semester.enum';
import { Task } from 'src/faculty/task/entities/task.entity';
import { Grade } from 'src/faculty/grade/entities/grade.entity';
import { Absence } from 'src/faculty/absence/entities/absence.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: Semester,
  })
  semester: Semester;

  @Column()
  name: string;

  @Column()
  professor: string;

  @Column({
    type: 'enum',
    enum: DayOfWeek,
    array: true,
  })
  daysOfWeek: DayOfWeek[];

  @OneToMany(() => Task, (task) => task.course)
  tasks: Task[];

  @OneToMany(() => Grade, (grade) => grade.course)
  grades: Grade[];

  @OneToMany(() => Absence, (absence) => absence.course)
  absences: Absence[];

  @Column()
  schedule: string;

  @Column()
  classroom: string;

  @Column()
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
