import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default () => ({
  port: +process.env.PORT || 3000,
  mockTodoServer: process.env.MOCK_TODO_API_URL,
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    entities: [join(__dirname, '../', '**/*.entity{.ts,.js}')],
    autoLoadEntities: true,
    namingStrategy: new SnakeNamingStrategy(),
  } as TypeOrmModuleOptions,
});
