import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './configuration';
import { UserUseCasesModule } from './use-cases/user/user-use-cases.module';
import { UserController } from './controllers/user.controller';

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
  ],
  controllers: [UserController],
})
export class AppModule {}
