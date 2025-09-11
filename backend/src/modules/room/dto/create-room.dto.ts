import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoomDto {
  @IsNotEmpty()
  roomName: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({ allowNaN: false }, { message: 'Capacity must be a valid number' })
  capacity: number;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  status: string; // por enquanto string depois mudo pra enum

  @IsOptional()
  @IsString()
  description: string | null;

  @IsOptional()
  @IsString()
  imageUrl: string | null;

  @IsNotEmpty()
  type: string; // por enquanto string depois mudo pra enum
}
