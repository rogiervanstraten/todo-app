import { Controller, Get, Post, Body, Query, Patch } from '@nestjs/common';
import {
  CreateTodoListTaskDto,
  ListQueryTodoListTaskDto,
  PatchTodoListTaskDto,
} from 'src/core/dtos/todo-list-task.dto';
import { CreateTodoListDto } from 'src/core/dtos/todo-list.dto';
import { User } from 'src/core/entities/user.entity';
import { CurrentUser } from 'src/interceptors/current-user.interceptor';
import { TodoUseCases } from 'src/use-cases/todo/todo.use-cases';

import { UUIDParam } from 'src/utils/params';

@Controller('todo')
export class TodoController {
  constructor(private todoUseCases: TodoUseCases) {}

  @Get('/lists')
  findAllLists(@CurrentUser() currentUser: User) {
    return this.todoUseCases.findAllLists({
      where: { user: { id: currentUser.id } },
    });
  }

  @Get('/lists/:id')
  findOne(@CurrentUser() currentUser: User, @UUIDParam('id') id: string) {
    return this.todoUseCases.findOneList({ id, user: { id: currentUser.id } });
  }

  @Post('/lists')
  createList(
    @CurrentUser() currentUser: User,
    @Body() todoListDto: CreateTodoListDto,
  ) {
    return this.todoUseCases.createTodoList(currentUser.id, todoListDto);
  }

  @Get('/lists/:listId/tasks')
  findAllListTasks(
    @UUIDParam('listId') listId: string,
    @CurrentUser() currentUser: User,
    @Query() query: ListQueryTodoListTaskDto,
  ) {
    return this.todoUseCases.findAllListTasks({
      userId: currentUser.id,
      listId,
      query,
    });
  }

  @Post('/lists/:id/tasks')
  createListTask(
    @UUIDParam('listId') listId: string,
    @CurrentUser() currentUser: User,
    @Body() todoListTaskDto: CreateTodoListTaskDto,
  ) {
    return this.todoUseCases.createTodoListTask(
      currentUser.id,
      listId,
      todoListTaskDto,
    );
  }

  @Patch('/lists/:listId/tasks/:id')
  patchListTask(
    @UUIDParam('id') id: string,
    @CurrentUser() currentUser: User,
    @Body() todoListTaskDto: PatchTodoListTaskDto,
  ) {
    return this.todoUseCases.patchTodoListTask(
      currentUser.id,
      id,
      todoListTaskDto,
    );
  }
}
