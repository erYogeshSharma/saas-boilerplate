import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class SignUpDto {
  @MinLength(3)
  @ApiProperty({ description: 'User full name', example: 'John Doe' })
  name: string;

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
