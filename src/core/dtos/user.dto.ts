import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;
}

export class PatchUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  integrationName?: string;

  @IsOptional()
  @IsString()
  integrationEntityId?: string;

  @IsOptional()
  @IsDate()
  integrationLastSyncDate?: Date;
}
