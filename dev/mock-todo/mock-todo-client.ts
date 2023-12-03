import {
  ListTodoListTasksInput,
  ListTodoListsInput,
  PatchTodoListTaskInput,
  TodoList,
  TodoListTask,
} from './types';

interface Options {
  headers?: Record<string, string>;
}

/** A TodoClient for the mock server */
export class MockTodoClient {
  constructor(
    private baseUrl: string,
    private options: Options = {},
  ) {}

  /**
   * TODO implement authorization code flow
   * 1. Authorization url (redirect_uri, client_id, scope, state, response_type)
   * 2. Authenticated by code (grant_type, client_id, client_secret, code, redirect_uri)
   */

  // async getAuthorizationUrl() {}
  // async getTokenByCode() {}

  async getTodoLists({ query }: ListTodoListsInput) {
    const queryString = this.toQueryString(query);

    return this.request<TodoList[]>(`/todo/lists?${queryString}`);
  }

  async getTodoListTasks({ listId, query }: ListTodoListTasksInput) {
    const queryString = this.toQueryString(query);

    return this.request<TodoListTask[]>(
      `/todo/lists/${listId}/tasks?${queryString}`,
    );
  }

  async patchTodoListTask({ id, listId, patch }: PatchTodoListTaskInput) {
    return this.request<TodoListTask>(`/todo/lists/${listId}/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(patch),
    });
  }

  /** Apply authentication header using token logic */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onRequest(_request: RequestInit) {
    // Add authentication
  }

  /** Perform request with some base configuration */
  private async request<T>(
    path: string = '/',
    options?: RequestInit,
  ): Promise<T> {
    const url = new URL(path, this.baseUrl);
    const requestOptions: RequestInit = {
      method: 'GET',
      ...options,
      headers: Object.assign(this.getHeaders(), this.options.headers),
    };

    await this.onRequest(requestOptions);

    try {
      const response = await fetch(url.href, {
        ...requestOptions,
      });
      const result = response.json();

      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**  */
  getHeaders(): Record<string, string> {
    return {
      'content-type': 'application/json',
      ...this.options?.headers,
    };
  }

  toQueryString(queryParams: any) {
    return new URLSearchParams(queryParams).toString();
  }
}
