import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EnumRoomStatus } from 'src/types/room';
import { EnumRoomType } from 'src/types/room';

export class CreateRoomDto {
  @ApiProperty({ example: 'Sala 101' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 30 })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false }, { message: 'Duration must be a valid number' })
  duration: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({ allowNaN: false }, { message: 'Capacity must be a valid number' })
  capacity: number;

  @ApiProperty({ example: 'Bloco A' })
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'disponivel' })
  @IsNotEmpty()
  @IsEnum(EnumRoomStatus, {
    message: 'Status must be one of: available, scheduled, maintenance',
  })
  status: EnumRoomStatus;

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
  @IsEnum(EnumRoomType, { message: 'Type must be one of: room, laboratory' })
  type: EnumRoomType;

  @ApiProperty({ example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  amenities: number[];
}
