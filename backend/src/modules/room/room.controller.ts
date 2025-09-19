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
