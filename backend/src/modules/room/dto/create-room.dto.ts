
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoomDto {
  @ApiProperty({ example: 'Sala 101' })
  @IsNotEmpty()
  roomName: string;

  @ApiProperty({ example: 30 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({ allowNaN: false }, { message: 'Capacity must be a valid number' })
  capacity: number;

  @ApiProperty({ example: 'Bloco A' })
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'disponivel' })
  @IsNotEmpty()
  status: string; // por enquanto string depois mudo pra enum

  @ApiPropertyOptional({ example: 'Sala com projetor' })
  @IsOptional()
  @IsString()
  description: string | null;

  @ApiPropertyOptional({ example: 'https://imagem.com/sala.jpg' })
  @IsOptional()
  @IsString()
  imageUrl: string | null;

  @ApiProperty({ example: 'aula' })
  @IsNotEmpty()
  type: string; // por enquanto string depois mudo pra enum
}
