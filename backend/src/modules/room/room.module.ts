import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room } from './entities/room.entity';
import { AvailabilityModule } from '../availability/availability.module';
import { AppointmentModule } from '../appointments/appointment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    AvailabilityModule,
    AppointmentModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
