import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { TodoList } from './todo-list.entity';

export type TodoListTaskStatus = 'not_started' | 'completed';

@Entity()
export class TodoListTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  integrationName: string;

  @Column({ nullable: true })
  integrationEntityId: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: ['not_started', 'completed'],
    default: 'not_started',
    nullable: false,
  })
  status: TodoListTaskStatus;

  @ManyToOne(() => User, (user) => user.todoLists, { nullable: false })
  user: User;

  @ManyToOne(() => TodoList, (todoList) => todoList.todoListTasks, {
    nullable: false,
  })
  todoList: TodoList;

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
