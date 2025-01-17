import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class OrgDto {
  @ApiProperty({
    description: 'Organization name',
    example: 'Example Organization',
  })
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Organization size',
    example: 100,
  })
  @IsNumber()
  @IsOptional()
  size?: number;

  @ApiProperty({
    description: 'Organization Brand Color',
    example: '#FFFFFF',
  })
  @IsString()
  @IsOptional()
  brandColor?: string;

  @ApiProperty({
    description: 'Organization logo URL',
    example: 'https://example.org/logo.png',
  })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty({
    description: 'Organization plan',
    example: 'premium',
  })
  @IsString()
  plan?: string;

  @ApiProperty({
    description: 'Organization domain',
    example: 'example.org',
  })
  @IsString()
  @IsOptional()
  domain?: string;
}
