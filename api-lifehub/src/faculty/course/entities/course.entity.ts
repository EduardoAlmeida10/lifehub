import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { DayOfWeek } from '../enums/day-of-week.enum';
import { Semester } from '../enums/semester.enum';
import { TaskEntity } from 'src/faculty/task/entities/task.entity';
import { GradeEntity } from 'src/faculty/grade/entities/grade.entity';
import { AbsenceEntity } from 'src/faculty/absence/entities/absence.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('courses')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

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

  @OneToMany(() => TaskEntity, (task) => task.course)
  tasks: TaskEntity[];

  @OneToMany(() => GradeEntity, (grade) => grade.course)
  grades: GradeEntity[];

  @OneToMany(() => AbsenceEntity, (absence) => absence.course)
  absences: AbsenceEntity[];

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
