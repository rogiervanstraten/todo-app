import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TodoListTask } from 'src/core/entities/todo-list-task.entity';
import { TODO_LIST_TASK_PATCH_EVENT } from 'src/core/events/todo-list-task.event';

@Injectable()
export class TodoIntegrationUseCases {
  private logger = new Logger('Todo Integration');

  constructor() {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  /** Sync all users with a integrationEntityId */
  async syncHandler() {
    // await this.todoIntegrationFactoryService.fullSync();

    return `A total of xxx records have been either created or updated`;
  }

  @OnEvent(TODO_LIST_TASK_PATCH_EVENT)
  async patchTodoListTaskHandler(todoListTask: TodoListTask) {
    // Check if we need to patch the integration entity
    if (!todoListTask.integrationEntityId) {
      this.logger.debug('Integration id does not exists so skip updating');
      return;
    }

    // try {
    //   this.todoIntegrationFactoryService
    //   .select(todoListTask.integrationEntityName)
    //   .patchTodoListTask(
    //     todoListTask
    //   );
    // } catch() {
    //   NOT_FOUND
    // }
  }
}
