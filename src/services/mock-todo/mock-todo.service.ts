import { Injectable } from '@nestjs/common';
import { ITodoIntegrationService } from 'src/core/abstracts/todo-integration-service.interface';
import { MockTodoClient } from 'mock-todo';
import { ConfigService } from '@nestjs/config';
import { ITodoService } from 'src/core/abstracts/todo-service.interface';
import { TodoListTask } from 'src/core/entities/todo-list-task.entity';
import { IUserService } from 'src/core/abstracts/user-service.interface';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class MockTodoService implements ITodoIntegrationService {
  private client: MockTodoClient;
  public integrationName: string = 'mock-todo';

  constructor(
    private configService: ConfigService,
    private userService: IUserService,
    private todoService: ITodoService,
  ) {
    const baseUrl = this.configService.get<string>('mockTodoServer');
    this.client = new MockTodoClient(baseUrl);
  }

  async fullSync(): Promise<any> {
    // Find all the users that we need to sync
    const linkedUsers = await this.userService.findAll({
      where: {
        integrationName: this.integrationName,
        integrationEntityId: Not(IsNull()),
      },
    });

    for (const user of linkedUsers) {
      await this.syncTodoLists({
        userId: user.integrationEntityId,
        lastSyncDate: user.integrationLastSyncDate,
      });

      // TODO patchUser with lastSyncDate
      await this.userService.patchUser(user.id, {
        integrationLastSyncDate: new Date(),
      });
    }
  }

  async syncTodoLists({
    lastSyncDate,
  }: {
    userId: string;
    lastSyncDate: Date;
  }): Promise<any> {
    const todoLists = await this.client.getTodoLists({
      query: {
        updatedAt: lastSyncDate,
      },
    });

    for (const todoList of todoLists) {
      await this.syncTodoListTasks({
        listId: String(todoList.id),
        lastSyncDate,
      });
    }
  }

  async syncTodoListTasks({
    listId,
    lastSyncDate,
  }: {
    listId: string;
    lastSyncDate?: Date;
  }): Promise<any> {
    await this.client.getTodoListTasks({
      listId,
      query: {
        updatedAt: lastSyncDate,
      },
    });
  }

  async updateTodoListTask(id: string): Promise<TodoListTask> {
    const todoListTask = await this.todoService.findOneListTask({ id });

    await this.client.patchTodoListTask({
      id: todoListTask.integrationEntityId,
      listId: todoListTask.todoList.integrationEntityId,
      patch: {
        completed: todoListTask.status === 'completed',
      },
    });

    return todoListTask;
  }
}
