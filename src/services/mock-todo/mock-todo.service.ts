import { Injectable } from '@nestjs/common';
import { ITodoIntegrationService } from 'src/core/abstracts/todo-integration-service.interface';
import { MockTodoClient } from 'mock-todo';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MockTodoService implements ITodoIntegrationService {
  private client: MockTodoClient;

  constructor(private configService: ConfigService) {
    const baseUrl = this.configService.get<string>('mockTodoServer');
    this.client = new MockTodoClient(baseUrl);
  }

  async fullSync(): Promise<any> {
    return null;
  }

  async syncUser(): Promise<any> {
    return null;
  }

  async syncTodoLists(): Promise<any> {
    return null;
  }

  async syncTodoListTasks(): Promise<any> {
    return null;
  }

  async patchTodoListTask(): Promise<any> {
    return null;
  }
}
