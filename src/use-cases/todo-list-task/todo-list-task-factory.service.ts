import { Injectable } from '@nestjs/common';
import { CreateTodoListTaskDto } from 'src/core/dtos/todo-list-task.dto';
import { TodoListTask } from 'src/core/entities/todo-list-task.entity';
import { TodoList } from 'src/core/entities/todo-list.entity';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class TodoListTaskFactoryService {
  createNewTodoListTask(createTodoListTaskDto: CreateTodoListTaskDto) {
    const newTodoListTask = new TodoListTask();
    newTodoListTask.title = createTodoListTaskDto.title;
    newTodoListTask.status = createTodoListTaskDto.status;

    newTodoListTask.todoList = { id: createTodoListTaskDto.listId } as TodoList;
    newTodoListTask.user = { id: createTodoListTaskDto.userId } as User;

    return newTodoListTask;
  }
}
