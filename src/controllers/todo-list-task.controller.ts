import { Controller, Get, Post, Patch, Body, Query } from '@nestjs/common';
import {
  CreateBodyTodoListTaskDto,
  ListQueryTodoListTaskDto,
  PatchBodyTodoListTaskDto,
} from 'src/core/dtos/todo-list-task.dto';
import { User } from 'src/core/entities/user.entity';
import { CurrentUser } from 'src/interceptors/current-user.interceptor';
import { TodoListTaskUseCases } from 'src/use-cases/todo-list-task/todo-list-task.use-cases';

import { UUIDParam } from 'src/utils/params';

@Controller('todo/lists/:listId/tasks')
export class TodoListTaskController {
  constructor(private todoListTaskUseCases: TodoListTaskUseCases) {}

  @Get()
  findAll(
    @UUIDParam('listId') listId: string,
    @CurrentUser() currentUser: User,
    @Query() query: ListQueryTodoListTaskDto,
  ) {
    return this.todoListTaskUseCases.findAllByList({
      ...query,
      listId,
      userId: currentUser.id,
    });
  }

  @Post()
  createTask(
    @UUIDParam('listId') listId: string,
    @CurrentUser() currentUser: User,
    @Body() todoListTaskDto: CreateBodyTodoListTaskDto,
  ) {
    return this.todoListTaskUseCases.createTodoListTask({
      ...todoListTaskDto,
      listId,
      userId: currentUser.id,
    });
  }

  @Patch(':id')
  patchTask(
    @UUIDParam('id') id: string,
    @Body() todoListTaskDto: PatchBodyTodoListTaskDto,
  ) {
    return this.todoListTaskUseCases.patchTodoListTask(id, todoListTaskDto);
  }
}
