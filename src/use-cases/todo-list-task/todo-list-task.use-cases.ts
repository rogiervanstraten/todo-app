import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoListTaskFactoryService } from './todo-list-task-factory.service';
import {
  CreateTodoListTaskDto,
  ListTodoListTaskDto,
  PatchTodoListTaskDto,
} from 'src/core/dtos/todo-list-task.dto';
import { TodoListTask } from 'src/core/entities/todo-list-task.entity';

@Injectable()
export class TodoListTaskUseCases {
  constructor(
    @InjectRepository(TodoListTask)
    private todoListTaskRepository: Repository<TodoListTask>,
    private todoListTaskFactoryService: TodoListTaskFactoryService,
  ) {}

  findAllByList(query: ListTodoListTaskDto): Promise<TodoListTask[]> {
    return this.todoListTaskRepository.find({
      skip: query.offset,
      take: query.limit,
      where: {
        todoList: {
          id: query.listId,
        },
        user: {
          id: query.userId,
        },
        status: query.status,
      },
    });
  }

  findOne(id: string): Promise<TodoListTask | undefined> {
    return this.todoListTaskRepository.findOneBy({ id });
  }

  async createTodoListTask(
    createTodoListTask: CreateTodoListTaskDto,
  ): Promise<TodoListTask> {
    const todoListTask =
      this.todoListTaskFactoryService.createNewTodoListTask(createTodoListTask);

    return this.todoListTaskRepository.save(todoListTask);
  }

  async patchTodoListTask(
    id: string,
    patchTodoListTask: PatchTodoListTaskDto,
  ): Promise<TodoListTask> {
    await this.todoListTaskRepository.update(id, patchTodoListTask);

    return this.todoListTaskRepository.findOneBy({ id });
  }
}
