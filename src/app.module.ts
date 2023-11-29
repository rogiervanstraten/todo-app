import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './configuration';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { UserController } from './controllers/user.controller';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { TodoListController } from './controllers/todo-list.controller';
import { TodoListUseCasesModule } from './use-cases/todo-list/todo-list-use-cases.module';
import { TodoListTaskController } from './controllers/todo-list-task.controller';
import { TodoListTaskUseCasesModule } from './use-cases/todo-list-task/todo-list-task-use-cases.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { User } from './core/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    UserUseCasesModule,
    TodoListUseCasesModule,
    TodoListTaskUseCasesModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  controllers: [UserController, TodoListController, TodoListTaskController],
})
export class AppModule {}
