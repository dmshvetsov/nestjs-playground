import { Task } from 'src/tasks/task.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index('user_uniq_username', { unique: true })
  username: string;

  @Column()
  password: string;

  /**
   * Associations
   */

  @OneToMany(() => Task, (task) => task.user, { eager: false })
  tasks: Task[];
}
