import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../enum/status.enum';
import { Type } from '../enum/type.enum';

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

  @Column({ type: 'enum', enum: Status, default: Status.AVAILABLE })
  status: Status;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'text', nullable: true })
  imageUrl: string | null;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date | null;

  @Column({ type: 'enum', enum: Type, default: Type.ROOM })
  type: Type;
}
