import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@ApiTags('room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('count/scheduled')
  @ApiOperation({ summary: 'Retorna a quantidade de salas agendadas (scheduled)' })
  @ApiResponse({ status: 200, description: 'Quantidade de salas agendadas retornada com sucesso.', schema: { example: { count: 3 } } })
  async countScheduledRooms() {
    return { count: await this.roomService.countScheduledRooms() };
  }

  @Get('count/available')
  @ApiOperation({ summary: 'Retorna a quantidade de salas disponíveis (available)' })
  @ApiResponse({ status: 200, description: 'Quantidade de salas disponíveis retornada com sucesso.', schema: { example: { count: 5 } } })
  async countAvailableRooms() {
    return { count: await this.roomService.countAvailableRooms() };
  }

  @Get('count')
  @ApiOperation({ summary: 'Retorna a quantidade de salas cadastradas' })
  @ApiResponse({ status: 200, description: 'Quantidade de salas retornada com sucesso.', schema: { example: { count: 10 } } })
  async countRooms() {
    return { count: await this.roomService.countRooms() };
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova sala' })
  @ApiBody({ type: CreateRoomDto })
  @ApiResponse({ status: 201, description: 'Sala criada com sucesso.' })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edita uma sala' })
  @ApiBody({ type: CreateRoomDto })
  @ApiResponse({ status: 201, description: 'Sala editada com sucesso.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as salas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de salas retornada com sucesso.',
  })
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma sala pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Sala encontrada.' })
  @ApiResponse({ status: 404, description: 'Sala não encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.findOne(id);
  }

  @Get(':id/details')
  @ApiOperation({
    summary: 'Retorna detalhes da sala, disponibilidade e agendamentos',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Detalhes da sala retornados com sucesso.',
  })
  async getRoomDetails(@Param('id', ParseIntPipe) id: number) {
    return await this.roomService.getRoomDetails(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma sala pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Sala removida com sucesso.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.remove(id);
  }
}
