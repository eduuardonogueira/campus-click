import { IsNumber, IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { EnumRoomStatus } from 'src/types/room';
import { EnumRoomType } from 'src/types/room';


export class CreateRoomDto {
  @IsNotEmpty()
  roomName: string;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false }, { message: 'Duration must be a valid number' })
  duration: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({ allowNaN: false }, { message: 'Capacity must be a valid number' })
  capacity: number;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  @IsEnum(EnumRoomStatus, { message: 'Status must be one of: available, scheduled, maintenance' })
  status: EnumRoomStatus;

  @IsOptional()
  @IsString()
  description: string | null;

  @IsOptional()
  @IsString()
  imageUrl: string | null;

  @IsNotEmpty()
  @IsEnum(EnumRoomType, { message: 'Type must be one of: room, laboratory' })
  type: EnumRoomType;
}
