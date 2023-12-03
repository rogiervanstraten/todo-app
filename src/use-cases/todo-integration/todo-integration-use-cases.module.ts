import { Module } from '@nestjs/common';
import { TodoIntegrationUseCases } from './todo-integration.use-cases';
import { MockTodoModule } from 'src/services/mock-todo/mock-todo.module';

@Module({
  imports: [MockTodoModule],
  providers: [TodoIntegrationUseCases],
  exports: [TodoIntegrationUseCases],
})
export class TodoIntegrationUseCasesModule {}
