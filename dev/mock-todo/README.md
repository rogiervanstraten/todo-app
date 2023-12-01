# Mock Todo Client
This serves as the mock todo server and client, providing a fundamental API client and server to demonstrate intercommunication between services. Please note that authentication has not been implemented in this basic setup.

## Authentication
In a real-life application, the MockTodo service requires user authentication through the TodoApp. This can be achieved by implementing an OAuth2 authorization code flow with the "MockTodo" application. The implementation may involve either a delegated connection or an application connection, depending on the specific requirements.

## Endpoints
A complete implementation of this MockTodoClient would also include other endpoints:

- createTodoList
- patchTodoList
- deleteTodoList
- getTodoListsDelta

- createTodoListTask
- patchTodoListTask
- deleteTodoListTask
- getTodoListTaskDelta