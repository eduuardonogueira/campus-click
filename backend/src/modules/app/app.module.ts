import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from '../room/room.module';
import { UserModule } from '../user/user.module';
import { Room } from '../room/entities/room.entity';
import { Booking } from '../booking/entities/booking.entity';
import { User } from '../user/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import configuration from '../../config/configuration';
import { Amenity } from 'src/modules/amenities/entities/amenity.entity';

const config = configuration();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.dbHost,
      port: config.dbPort,
      username: config.dbUser,
      password: config.dbPass,
      database: config.dbName,
      entities: [Room, Booking, User, Amenity],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    RoomModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
