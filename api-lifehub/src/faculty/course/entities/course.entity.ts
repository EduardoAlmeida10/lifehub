import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DayOfWeek } from '../enums/day-of-week.enum';
import { Semester } from '../enums/semester.enum';

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
