import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ScheduledGamesService } from './scheduled-games.service';
import { CreateScheduledGameDto } from './dto/create-scheduled-game.dto';
import { UpdateScheduledGameDto } from './dto/update-scheduled-game.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Scheduled Games')
@Controller('scheduled-games')
export class ScheduledGamesController {
  constructor(private readonly scheduledGamesService: ScheduledGamesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new scheduled game' })
  @ApiResponse({
    status: 201,
    description: 'Scheduled game created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createScheduledGameDto: CreateScheduledGameDto) {
    return this.scheduledGamesService.create(createScheduledGameDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all scheduled games' })
  @ApiResponse({
    status: 200,
    description: 'Scheduled games retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'No scheduled games found.' })
  findAll() {
    return this.scheduledGamesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a scheduled game by ID' })
  @ApiResponse({
    status: 200,
    description: 'Scheduled game retrieved successfully.',
  }) // Respuesta esperada
  @ApiResponse({ status: 404, description: 'Scheduled game not found.' })
  @ApiParam({ name: 'id', description: 'ID of the scheduled game to retrieve' })
  findOne(@Param('id') id: string) {
    return this.scheduledGamesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a scheduled game' })
  @ApiResponse({
    status: 200,
    description: 'Scheduled game updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Scheduled game not found.' })
  @ApiParam({ name: 'id', description: 'ID of the scheduled game to update' })
  update(
    @Param('id') id: string,
    @Body() updateScheduledGameDto: UpdateScheduledGameDto,
  ) {
    return this.scheduledGamesService.update(id, updateScheduledGameDto);
  }
}
