import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TodoList } from './todo-list.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  integrationName: string;

  @Column({ nullable: true })
  integrationEntityId: string;

  @Column({ nullable: true })
  integrationLastSyncDate: Date;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => TodoList, (todoList) => todoList.user)
  todoLists: TodoList;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
