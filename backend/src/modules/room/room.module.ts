import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomAmenitiesService } from '../room-amenities/room-amenities.service';
import { Room } from './entities/room.entity';
import { Amenity } from '../amenities/entities/amenity.entity';
import { RoomAmenity } from '../room-amenities/entities/room-amenity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Amenity, RoomAmenity])],
  controllers: [RoomController],
  providers: [RoomService, RoomAmenitiesService],
})
export class RoomModule {}
