import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { RoomAmenitiesService } from '../room-amenities/room-amenities.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private roomAmenitiesService: RoomAmenitiesService,
  ) {}

  async findAll() {
    const findedRooms = await this.roomRepository.find({
      relations: ['roomAmenities', 'roomAmenities.amenity'],
    });
    if (!findedRooms) {
      throw new HttpException(`Rooms Not Found`, 404);
    }
    const formatedAmenities = findedRooms.map((room) => ({
      ...room,
      amenities: room.roomAmenities.map((ra) => ({
        id: ra.amenity.id,
        name: ra.amenity.name,
      })),
      roomAmenities: undefined,
    }));

    return formatedAmenities;
  }

  async findOne(id: number) {
    const findedRooms = await this.roomRepository.findOne({
      where: { id },
      relations: ['roomAmenities', 'roomAmenities.amenity'],
    });
    if (!findedRooms) {
      throw new HttpException(`Room with ID ${id} not found`, 404);
    }
    const formatedAmenities = {
      ...findedRooms,
      amenities: findedRooms.roomAmenities.map((ra) => ({
        id: ra.amenity.id,
        name: ra.amenity.name,
      })),
      roomAmenities: undefined,
    };

    return formatedAmenities;
  }

  async create(createRoomDto: CreateRoomDto) {
    const room = this.roomRepository.create({
      ...createRoomDto,
      createdAt: new Date(),
    });

    const createdRoom = await this.roomRepository.save(room);

    const { amenities } = createRoomDto;

    if (createRoomDto.amenities && createRoomDto.amenities.length > 0) {
      const roomAmenities = await Promise.all(
        amenities.map((amenityId) =>
          this.roomAmenitiesService.create({
            amenityId: amenityId,
            roomId: createdRoom.id,
          }),
        ),
      );

      const formatedRoom = {
        ...createRoomDto,
        amenities: [...roomAmenities.map((roomAmenity) => roomAmenity.amenity)],
      };

      return formatedRoom;
    }

    return createdRoom;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.preload({
      id,
      ...updateRoomDto,
      updatedAt: new Date(),
    });

    if (!room) {
      throw new HttpException(`Room with ID ${id} not found`, 404);
    }

    return this.roomRepository.save(room);
  }

  async remove(id: number) {
    const foundRoom = await this.findOne(id);
    return this.roomRepository.delete(foundRoom.id);
  }
}
