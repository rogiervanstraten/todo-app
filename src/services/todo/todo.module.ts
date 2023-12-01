import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from 'src/core/entities/todo-list.entity';
import { TodoListTask } from 'src/core/entities/todo-list-task.entity';
import { ITodoService } from 'src/core/abstracts/todo-service.interface';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList, TodoListTask])],
  providers: [
    {
      provide: ITodoService,
      useClass: TodoService,
    },
  ],
  exports: [ITodoService],
})
export class TodoModule {}
