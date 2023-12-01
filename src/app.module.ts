import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import configuration from './configuration';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { UserController } from './controllers/user.controller';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { TodoController } from './controllers/todo.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { User } from './core/entities/user.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TodoUseCasesModule } from './use-cases/todo/todo-use-cases.module';
import { UserModule } from './services/user/user.module';
import { TodoIntegrationUseCasesModule } from './use-cases/todo-integration/todo-integration-use-cases.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    UserModule,
    UserUseCasesModule,
    TodoUseCasesModule,
    TodoIntegrationUseCasesModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
  controllers: [UserController, TodoController],
})
export class AppModule {}
