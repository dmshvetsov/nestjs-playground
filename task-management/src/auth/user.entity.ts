import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index('user_uniq_username', { unique: true })
  username: string;

  @Column()
  password: string;
}
