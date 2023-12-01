// TODO clean up the mock server!

import { faker } from '@faker-js/faker';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { TodoList, TodoListTask, User } from './types';

const port = 9000;
const app = express();

const users: User[] = new Array(20).fill(null).map((_, i) => ({
  id: 1,
  fullName: faker.person.fullName(),
  updatedAt: new Date(),
}));

const lists: TodoList[] = [
  { id: 1, title: 'buy the milk', updatedAt: new Date() },
];
const tasks: TodoListTask[] = [
  {
    id: 1,
    listId: 1,
    title: 'buy the milk',
    completed: false,
    updatedAt: new Date(),
  },
  {
    id: 2,
    listId: 1,
    title: 'rent a car',
    completed: false,
    updatedAt: new Date(),
  },
  {
    id: 3,
    listId: 1,
    title: 'feed the cat',
    completed: false,
    updatedAt: new Date(),
  },
];

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/users', (request, response) => response.status(200).json(users));
app.get('/me', (request, response) => response.status(200).json(users[0]));

app.get('/todo/lists', (request, response) => response.status(200).json(lists));

app.get('/todo/lists/:id', (request, response) =>
  response
    .status(200)
    .json(lists.find((v) => String(v.id) === request.params.id)),
);

app.get('/todo/lists/:id/tasks', (request, response) =>
  response
    .status(200)
    .json(tasks.filter((v) => String(v.listId) === request.params.id)),
);

app.post<string>('/todo/lists', (request, response) => {
  const id = lists[lists.length - 1].id + 1;
  const newList = {
    id,
    updatedAt: new Date(),
    ...request.body,
  };

  lists.push(newList);

  return response.status(201).json(newList);
});

app.post('/todo/lists/:id/tasks', (request, response) => {
  const id = tasks[tasks.length - 1].id + 1;
  const newTask = {
    id,
    listId: +request.params.id,
    updatedAt: new Date(),
    ...request.body,
  };

  tasks.push(newTask);

  return response.status(201).json(newTask);
});

app.patch('/todo/lists/:listId/tasks/:id', (request, response) => {
  const taskIndex = tasks.findIndex((v) => v.id === +request.params.id);

  if (taskIndex === -1) {
    throw new Error('Task does not exists');
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...request.body,
  };

  return response.status(200).json(tasks[taskIndex]);
});

app.listen(port);
