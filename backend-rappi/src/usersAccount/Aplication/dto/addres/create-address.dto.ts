import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateUserAddressDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  street: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0) // Altura mínima 0
  height: number;

  @IsString()
  @IsOptional()
  details?: string;
}
