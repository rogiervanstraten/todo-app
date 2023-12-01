export abstract class ITodoIntegrationService {
  abstract fullSync(): Promise<any>;
  abstract syncUser(): Promise<any>;
  abstract syncTodoLists(): Promise<any>;
  abstract syncTodoListTasks(): Promise<any>;
  abstract patchTodoListTask(): Promise<any>;
}
