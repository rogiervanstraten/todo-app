import {
  CreateTodoListTaskDto,
  ListQueryTodoListTaskDto,
  PatchTodoListTaskDto,
} from '../dtos/todo-list-task.dto';
import { CreateTodoListDto } from '../dtos/todo-list.dto';
import { TodoListTask } from '../entities/todo-list-task.entity';
import { TodoList } from '../entities/todo-list.entity';
import { CreateInput, PatchInput } from './types';
import { FindOptionsWhere, FindManyOptions } from 'typeorm';

// Shortcut... should be made not depended on typeorm
export interface FindAllListsArgs extends FindManyOptions<TodoList> {}
export interface FindOneListArgs extends FindOptionsWhere<TodoList> {}

export interface FindAllListTasksArgs {
  userId: string;
  listId: string;
  query: ListQueryTodoListTaskDto;
}

export interface FindOneListTaskArgs {
  userId: string;
  listId: string;
  id: string;
}

export interface CreateTodoListInput<T = CreateTodoListDto>
  extends CreateInput<T> {
  userId: string;
}

export interface CreateTodoListTaskInput<T = CreateTodoListTaskDto>
  extends CreateInput<T> {
  userId: string;
  listId: string;
}

export interface PatchTodoListTaskInput<T = PatchTodoListTaskDto>
  extends PatchInput<T> {
  userId: string;
  id: string;
}

export abstract class ITodoService {
  abstract findAllLists(args?: FindAllListsArgs): Promise<TodoList[]>;
  abstract findOneList(args?: FindOneListArgs): Promise<TodoList>;
  abstract createTodoList(args: CreateTodoListInput): Promise<TodoList>;

  abstract findAllListTasks(
    args: FindAllListTasksArgs,
  ): Promise<TodoListTask[]>;
  abstract findOneListTask(args: FindOneListTaskArgs): Promise<TodoListTask>;

  abstract createTodoListTask(
    args: CreateTodoListTaskInput,
  ): Promise<TodoListTask>;
  abstract patchTodoListTask(
    args: PatchTodoListTaskInput,
  ): Promise<TodoListTask>;
}
