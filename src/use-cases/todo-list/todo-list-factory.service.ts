import { Injectable } from '@nestjs/common';
import { CreateTodoListDto } from 'src/core/dtos/todo-list.dto';
import { TodoList } from 'src/core/entities/todo-list.entity';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class TodoListFactoryService {
  createNewTodoList(createTodoListDto: CreateTodoListDto) {
    const newTodoList = new TodoList();
    newTodoList.displayName = createTodoListDto.displayName;
    newTodoList.user = { id: createTodoListDto.userId } as User;

    return newTodoList;
  }
}
