import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'email field must be a valid email address format',
    },
  )
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  username: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsNumberString()
  @MaxLength(20)
  phone: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsOptional()
  address: null | string;
}
