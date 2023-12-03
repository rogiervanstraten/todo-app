import { Module } from '@nestjs/common';
import { MockTodoService } from './mock-todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { TodoList } from 'src/core/entities/todo-list.entity';
import { TodoListTask } from 'src/core/entities/todo-list-task.entity';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from '../todo/todo.module';
import { ITodoIntegrationService } from 'src/core/abstracts/todo-integration-service.interface';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, TodoList, TodoListTask]),
    TodoModule,
  ],
  providers: [
    {
      provide: ITodoIntegrationService,
      useClass: MockTodoService,
    },
  ],
  exports: [ITodoIntegrationService],
})
export class MockTodoModule {}
