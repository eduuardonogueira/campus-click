import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("Room")
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    locationBloco: string; // Pavilhão, Bloco, Prédio

    @Column()
    locationAndar: string; // Andar, Piso

    @Column("text", { array: true })
    amenities: string[]; // Lista do id
    
    // @Column()
    // bookings: Booking[];

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
