export interface User {
  id: number;
  fullName: string;
  updatedAt: Date;
}

export interface TodoList {
  id: number;
  title: string;
  updatedAt: Date;
}

export interface TodoListTask {
  id: number;
  listId: number;
  title: string;
  completed: boolean;
  updatedAt: Date;
}

export interface QueryOptions {
  limit?: number;
  offset?: number;
  updatedAt?: Date;
}

export interface ListTodoListsInput {
  query?: QueryOptions;
}

export interface ListTodoListTasksInput {
  listId: string;
  query?: QueryOptions;
}

export interface PatchTodoListTask {
  title?: string;
  completed?: boolean;
}

export interface PatchTodoListTaskInput {
  id: string;
  listId: string;
  patch: PatchTodoListTask;
}
