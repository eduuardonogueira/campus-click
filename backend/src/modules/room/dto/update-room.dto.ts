import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { EnumRoomStatus, EnumRoomType } from 'src/types/room';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @IsOptional()
  @IsString()
  roomName: string;

  @IsOptional()
  @IsNumber({ allowNaN: false }, { message: 'Duration must be a valid number' })
  duration: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false }, { message: 'Capacity must be a valid number' })
  capacity: number;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsEnum(EnumRoomStatus, { message: 'Status must be one of: available, scheduled, maintenance' })
  status: EnumRoomStatus;

  @IsOptional()
  @IsString()
  description: string | null;

  @IsOptional()
  @IsString()
  imageUrl: string | null;

  @IsOptional()
  @IsEnum(EnumRoomType, { message: 'Type must be one of: room, laboratory' })
  type: EnumRoomType;
}
