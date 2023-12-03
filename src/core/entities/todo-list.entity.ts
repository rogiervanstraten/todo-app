import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { TodoListTask } from './todo-list-task.entity';

@Entity()
export class TodoList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  integrationName: string;

  @Column({ nullable: true })
  integrationEntityId: string;

  @ManyToOne(() => User, (user) => user.todoLists, { nullable: false })
  user: User;

  @Column()
  displayName: string;

  @OneToMany(() => TodoListTask, (todoListTask) => todoListTask.todoList)
  todoListTasks: TodoListTask;

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
