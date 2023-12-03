import { Module } from '@nestjs/common';
import { TodoUseCases } from './todo.use-cases';
import { TodoModule } from 'src/services/todo/todo.module';

@Module({
  imports: [TodoModule],
  providers: [TodoUseCases],
  exports: [TodoUseCases],
})
export class TodoUseCasesModule {}
