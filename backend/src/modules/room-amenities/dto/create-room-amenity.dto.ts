import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateRoomAmenityDto {
    @IsNotEmpty({ message: 'roomId should not be empty' })
    @IsNumber({}, { message: 'roomId must be a number' })
    @IsPositive({ message: 'roomId must be a number greater than 0' })
    roomId: number;

    @IsNotEmpty({ message: 'amenityId should not be empty' })
    @IsNumber({}, { message: 'amenityId must be a number' })
    @IsPositive({ message: 'amenityId must be a number greater than 0' })
    amenityId: number;
}
