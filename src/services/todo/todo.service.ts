import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTodoListInput,
  CreateTodoListTaskInput,
  FindAllListTasksArgs,
  FindAllListsArgs,
  FindOneListArgs,
  FindOneListTaskArgs,
  ITodoService,
  PatchTodoListTaskInput,
} from 'src/core/abstracts/todo-service.interface';
import {
  CreateTodoListTaskDto,
  PatchTodoListTaskDto,
} from 'src/core/dtos/todo-list-task.dto';
import { TodoListTask } from 'src/core/entities/todo-list-task.entity';
import { TodoList } from 'src/core/entities/todo-list.entity';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService implements ITodoService {
  constructor(
    @InjectRepository(TodoList)
    private todoListRepository: Repository<TodoList>,
    @InjectRepository(TodoListTask)
    private todoListTaskRepository: Repository<TodoListTask>,
  ) {}

  findAllLists(args: FindAllListsArgs): Promise<TodoList[]> {
    return this.todoListRepository.find(args);
  }

  findOneList(args: FindOneListArgs): Promise<TodoList | undefined> {
    return this.todoListRepository.findOneBy(args);
  }

  createTodoList({ userId, input }: CreateTodoListInput): Promise<TodoList> {
    const newTodoList = new TodoList();
    newTodoList.displayName = input.displayName;
    newTodoList.user = { id: userId } as User;

    return this.todoListRepository.save(newTodoList);
  }

  findAllListTasks({
    listId,
    userId,
    query,
  }: FindAllListTasksArgs): Promise<TodoListTask[]> {
    return this.todoListTaskRepository.find({
      skip: query.offset,
      take: query.limit,
      where: {
        todoList: {
          id: listId,
        },
        user: {
          id: userId,
        },
        status: query.status,
      },
    });
  }

  findOneListTask({ userId, id }: FindOneListTaskArgs): Promise<TodoListTask> {
    return this.todoListTaskRepository.findOneBy({
      id,
      user: { id: userId },
    });
  }

  createTodoListTask({
    userId,
    listId,
    input,
  }: CreateTodoListTaskInput<CreateTodoListTaskDto>): Promise<TodoListTask> {
    const newTodoListTask = new TodoListTask();
    newTodoListTask.title = input.title;
    newTodoListTask.status = input.status;

    newTodoListTask.todoList = { id: listId } as TodoList;
    newTodoListTask.user = { id: userId } as User;

    return this.todoListTaskRepository.save(newTodoListTask);
  }

  async patchTodoListTask({
    id,
    patch,
  }: PatchTodoListTaskInput<PatchTodoListTaskDto>): Promise<TodoListTask> {
    await this.todoListTaskRepository.update(id, patch);

    return this.todoListTaskRepository.findOneBy({ id });
  }
}
