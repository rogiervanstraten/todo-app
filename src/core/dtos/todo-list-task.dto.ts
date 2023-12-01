import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Pagination } from './pagination.dto';
import { TodoListTaskStatus } from '../entities/todo-list-task.entity';

export class CreateTodoListTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  status?: TodoListTaskStatus;
}

export class PatchTodoListTaskDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  status?: TodoListTaskStatus;
}

export class ListTodoListTaskDto extends Pagination {
  @IsOptional()
  status: TodoListTaskStatus;
}

export class ListQueryTodoListTaskDto extends Pagination {
  @IsOptional()
  status: TodoListTaskStatus;
}
