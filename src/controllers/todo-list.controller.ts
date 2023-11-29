import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateBodyTodoListDto } from 'src/core/dtos/todo-list.dto';
import { User } from 'src/core/entities/user.entity';
import { CurrentUser } from 'src/interceptors/current-user.interceptor';
import { TodoListUseCases } from 'src/use-cases/todo-list/todo-list.use-cases';
import { UUIDParam } from 'src/utils/params';

@Controller('todo/lists')
export class TodoListController {
  constructor(private todoListUseCases: TodoListUseCases) {}

  @Get()
  findAll() {
    return this.todoListUseCases.findAll();
  }

  @Get(':id')
  findOne(@UUIDParam('id') id: string) {
    return this.todoListUseCases.findOne(id);
  }

  @Post()
  createList(
    @CurrentUser() currentUser: User,
    @Body() todoListDto: CreateBodyTodoListDto,
  ) {
    return this.todoListUseCases.createTodoList({
      ...todoListDto,
      userId: currentUser.id,
    });
  }
}
