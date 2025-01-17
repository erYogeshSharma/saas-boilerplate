import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @MinLength(8)
  password: string;
}

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    description: 'new password',
    example: 'password123',
  })
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'reset token',
    example: 'sdfasoiw4jofmsdovm',
  })
  @MinLength(8)
  token: string;
}
