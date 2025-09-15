import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @IsOptional()
  @IsString()
  roomName: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false }, { message: 'Capacity must be a valid number' })
  capacity: number;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  description: string | null;

  @IsOptional()
  @IsString()
  imageUrl: string | null;

  @IsOptional()
  @IsString()
  type: string;
}
