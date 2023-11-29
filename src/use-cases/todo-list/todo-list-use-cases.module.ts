import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from 'src/core/entities/todo-list.entity';
import { TodoListFactoryService } from './todo-list-factory.service';
import { TodoListUseCases } from './todo-list.use-cases';
import { User } from 'src/core/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList, User])],
  providers: [TodoListFactoryService, TodoListUseCases],
  exports: [TodoListFactoryService, TodoListUseCases],
})
export class TodoListUseCasesModule {}
