import { Module } from '@nestjs/common';
import { MockTodoService } from './mock-todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { TodoList } from 'src/core/entities/todo-list.entity';
import { TodoListTask } from 'src/core/entities/todo-list-task.entity';
import { ITodoService } from 'src/core/abstracts/todo-service.interface';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, TodoList, TodoListTask]),
  ],
  providers: [
    {
      provide: ITodoService,
      useClass: MockTodoService,
    },
  ],
  exports: [ITodoService],
})
export class MockTodoModule {}
