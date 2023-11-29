import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Pagination } from './pagination.dto';
import { TodoListTaskStatus } from '../entities/todo-list-task.entity';

export class CreateBodyTodoListTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  status: TodoListTaskStatus;
}

export class PatchBodyTodoListTaskDto {
  @IsOptional()
  title: string;

  @IsOptional()
  status: TodoListTaskStatus;
}

export class CreateTodoListTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  listId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  status: TodoListTaskStatus;
}

export class PatchTodoListTaskDto {
  @IsOptional()
  title: string;

  @IsOptional()
  status: TodoListTaskStatus;
}

export class ListTodoListTaskDto extends Pagination {
  @IsOptional()
  status: TodoListTaskStatus;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  listId: string;
}

export class ListQueryTodoListTaskDto extends Pagination {
  @IsOptional()
  status: TodoListTaskStatus;
}
