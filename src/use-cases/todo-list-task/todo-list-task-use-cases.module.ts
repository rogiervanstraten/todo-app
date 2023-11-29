import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from 'src/core/entities/todo-list.entity';
import { TodoListTaskFactoryService } from './todo-list-task-factory.service';
import { TodoListTaskUseCases } from './todo-list-task.use-cases';
import { User } from 'src/core/entities/user.entity';
import { TodoListTask } from 'src/core/entities/todo-list-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, TodoList, TodoListTask])],
  providers: [TodoListTaskFactoryService, TodoListTaskUseCases],
  exports: [TodoListTaskFactoryService, TodoListTaskUseCases],
})
export class TodoListTaskUseCasesModule {}
