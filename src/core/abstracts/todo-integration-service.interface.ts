import { TodoListTask } from '../entities/todo-list-task.entity';

export abstract class ITodoIntegrationService {
  abstract readonly integrationName: string;
  abstract fullSync(): Promise<any>;
  abstract updateTodoListTask(id: string): Promise<TodoListTask>;
}
