import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoList } from 'src/core/entities/todo-list.entity';
import { CreateTodoListDto } from 'src/core/dtos/todo-list.dto';
import { TodoListFactoryService } from './todo-list-factory.service';

@Injectable()
export class TodoListUseCases {
  constructor(
    @InjectRepository(TodoList)
    private todoListRepository: Repository<TodoList>,
    private todoListFactoryService: TodoListFactoryService,
  ) {}

  findAll(): Promise<TodoList[]> {
    return this.todoListRepository.find();
  }

  findOne(id: string): Promise<TodoList | undefined> {
    return this.todoListRepository.findOneBy({ id });
  }

  async createTodoList(createTodoList: CreateTodoListDto): Promise<TodoList> {
    const todoList =
      this.todoListFactoryService.createNewTodoList(createTodoList);

    return this.todoListRepository.save(todoList);
  }
}
