import { User } from 'src/auth/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  /**
   * Associations
   */

  @OneToMany(() => User, (user) => user.tasks, { eager: true })
  user: User;
}
