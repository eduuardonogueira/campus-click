import { Room } from '../entities/room.entity';
import { Availability } from '../../availability/entities/availability.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';

export class RoomDetailsDto {
  room: Room;
  availability: Availability[];
  appointments: Appointment[];
}
