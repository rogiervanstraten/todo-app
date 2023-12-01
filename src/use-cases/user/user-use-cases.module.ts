import { Module } from '@nestjs/common';
import { UserUseCases } from './user.use-cases';
import { UserModule } from 'src/services/user/user.module';

@Module({
  imports: [UserModule],
  providers: [UserUseCases],
  exports: [UserUseCases],
})
export class UserUseCasesModule {}
