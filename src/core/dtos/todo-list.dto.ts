import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBodyTodoListDto {
  @IsString()
  @IsNotEmpty()
  displayName: string;
}

export class CreateTodoListDto {
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
