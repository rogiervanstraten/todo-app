import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { UserFactoryService } from './user-factory.service';
import { UserUseCases } from './user.use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserFactoryService, UserUseCases],
  exports: [UserFactoryService, UserUseCases],
})
export class UserUseCasesModule {}
