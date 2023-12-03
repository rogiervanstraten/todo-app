import { Injectable } from '@nestjs/common';
import { TodoList } from 'src/core/entities/todo-list.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TODO_LIST_CREATE_EVENT } from 'src/core/events/todo-list.event';
import {
  FindAllListTasksArgs,
  FindAllListsArgs,
  FindOneListArgs,
  FindOneListTaskArgs,
  ITodoService,
} from 'src/core/abstracts/todo-service.interface';
import { CreateTodoListDto } from 'src/core/dtos/todo-list.dto';
import {
  CreateTodoListTaskDto,
  PatchTodoListTaskDto,
} from 'src/core/dtos/todo-list-task.dto';
import { TodoListTask } from 'src/core/entities/todo-list-task.entity';
import {
  TODO_LIST_TASK_CREATE_EVENT,
  TODO_LIST_TASK_PATCH_EVENT,
} from 'src/core/events/todo-list-task.event';

@Injectable()
export class TodoUseCases {
  constructor(
    private todoService: ITodoService,
    private eventEmitter: EventEmitter2,
  ) {}

  findAllLists(args: FindAllListsArgs): Promise<TodoList[]> {
    return this.todoService.findAllLists(args);
  }

  findOneList(args: FindOneListArgs): Promise<TodoList | undefined> {
    return this.todoService.findOneList(args);
  }

  async createTodoList(
    userId: string,
    createTodoList: CreateTodoListDto,
  ): Promise<TodoList> {
    const todoList = await this.todoService.createTodoList({
      userId,
      input: createTodoList,
    });

    this.eventEmitter.emit(TODO_LIST_CREATE_EVENT, todoList);

    return todoList;
  }

  findAllListTasks(args: FindAllListTasksArgs): Promise<TodoListTask[]> {
    return this.todoService.findAllListTasks(args);
  }

  findOneListTask(
    args: FindOneListTaskArgs,
  ): Promise<TodoListTask | undefined> {
    return this.todoService.findOneListTask(args);
  }

  async createTodoListTask(
    userId: string,
    listId: string,
    createTodoListTask: CreateTodoListTaskDto,
  ): Promise<TodoListTask> {
    const todoListTask = await this.todoService.createTodoListTask({
      userId,
      listId,
      input: createTodoListTask,
    });

    this.eventEmitter.emit(TODO_LIST_TASK_CREATE_EVENT, todoListTask);

    return todoListTask;
  }

  async patchTodoListTask(
    userId: string,
    id: string,
    patchTodoListTask: PatchTodoListTaskDto,
  ): Promise<TodoListTask> {
    const todoListTask = this.todoService.patchTodoListTask({
      userId,
      id,
      patch: patchTodoListTask,
    });

    this.eventEmitter.emit(TODO_LIST_TASK_PATCH_EVENT, todoListTask);

    return todoListTask;
  }
}
