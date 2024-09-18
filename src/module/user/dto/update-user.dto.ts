import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(8, {
    message: 'The characters minimum is 8. Please complete your password',
  })
  @MaxLength(25, {
    message:
      'The maximum characters allowed are 25. Please restructure the password',
  })
  password: string;
}
