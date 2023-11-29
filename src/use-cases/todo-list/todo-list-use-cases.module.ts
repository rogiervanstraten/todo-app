import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from 'src/core/entities/todo-list.entity';
import { TodoListFactoryService } from './todo-list-factory.service';
import { TodoListUseCases } from './todo-list.use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList])],
  providers: [TodoListFactoryService, TodoListUseCases],
  exports: [TodoListFactoryService, TodoListUseCases],
})
export class TodoListUseCasesModule {}
