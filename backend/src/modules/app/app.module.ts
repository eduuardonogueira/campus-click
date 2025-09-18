import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from '../room/room.module';
import { Room } from '../room/entities/room.entity';
import { User } from '../user/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import configuration from '../../config/configuration';
import { Amenity } from 'src/modules/amenities/entities/amenity.entity';
import { Availability } from '../availability/entities/availability.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { UserModule } from '../user/user.module';
import { AmenitiesModule } from '../amenities/amenities.module';
import { RoomAmenity } from '../room-amenities/entities/room-amenity.entity';
import { RoomAmenitiesModule } from '../room-amenities/room-amenities.module';
import { AvailabilityModule } from '../availability/availability.module';
import { AppointmentModule } from '../appointments/appointment.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SelfConsultModule } from 'src/tasks/self-consult/self-consult.module';

const config = configuration();

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SelfConsultModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.dbHost,
      port: config.dbPort,
      username: config.dbUser,
      password: config.dbPass,
      database: config.dbName,
      entities: [Room, User, Amenity, RoomAmenity, Availability, Appointment],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    RoomModule,
    UserModule,
    AuthModule,
    RoomModule,
    UserModule,
    AmenitiesModule,
    RoomAmenitiesModule,
    AvailabilityModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
