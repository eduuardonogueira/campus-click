import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    name: string;
    locationBloco: string;
    locationAndar: string;
    amenities: string[];
}
