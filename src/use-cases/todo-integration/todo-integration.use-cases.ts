import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ITodoIntegrationService } from 'src/core/abstracts/todo-integration-service.interface';
import { TodoListTask } from 'src/core/entities/todo-list-task.entity';
import { TODO_LIST_TASK_PATCH_EVENT } from 'src/core/events/todo-list-task.event';

@Injectable()
export class TodoIntegrationUseCases {
  private logger = new Logger('Todo Integration');

  constructor(private todoIntegrationService: ITodoIntegrationService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  /** Sync all users with a integrationEntityId */
  async syncHandler(): Promise<string> {
    await this.todoIntegrationService.fullSync();

    return `A total of xxx records have been either created or updated`;
  }

  @OnEvent(TODO_LIST_TASK_PATCH_EVENT)
  /** Immediatly update todo in external service */
  async updateTodoListTaskHandler(todoListTask: TodoListTask): Promise<string> {
    // Check if we need to patch the integration entity
    if (!this.hasLinkedIntegration(todoListTask)) {
      this.logger.debug('Not linked to any integration');
      return;
    }

    try {
      await this.todoIntegrationService.updateTodoListTask(todoListTask.id);

      return 'Linked integration todo list task was updated';
    } catch (err) {
      this.logger.error(err);

      /**
       * Retry event delivery service
       * TODO implement event delivery service with deadletter event implementation
       *
       * this.eventDeliveryService.attempt(TODO_LIST_TASK_PATCH_EVENT, todoListTask)
       */
    }
  }

  hasLinkedIntegration(todoListTask: TodoListTask): boolean {
    return !!todoListTask.integrationEntityId;
  }
}
