import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EnumRoomType } from 'src/types/room';
import { EnumRoomStatus } from 'src/types/room';

@Entity('Room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomName: string;

  @Column()
  duration: number;

  @Column()
  capacity: number;

  @Column()
  location: string;

  @Column({ type: 'enum', enum: EnumRoomStatus, default: EnumRoomStatus.AVAILABLE })
  status: EnumRoomStatus;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'text', nullable: true })
  imageUrl: string | null;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date | null;

  @Column({ type: 'enum', enum: EnumRoomType, default: EnumRoomType.ROOM })
  type: EnumRoomType;
}
