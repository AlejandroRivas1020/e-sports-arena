import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ScheduledGamesService } from './scheduled-games.service';
import { CreateScheduledGameDto } from './dto/create-scheduled-game.dto';
import { UpdateScheduledGameDto } from './dto/update-scheduled-game.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ScheduledGame } from './entities/scheduled-game.entity';

@ApiTags('Scheduled Games')
@ApiBearerAuth()
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
  })
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

  @Post('generate/:tournamentId')
  @ApiOperation({ summary: 'Generate scheduled games for a tournament' })
  @ApiResponse({
    status: 201,
    description: 'Games generated successfully',
    type: [ScheduledGame],
  })
  @ApiResponse({
    status: 404,
    description: 'No games were generated for this tournament.',
  })
  @ApiParam({
    name: 'tournamentId',
    required: true,
    description: 'ID of the tournament for which to generate games',
  })
  async generateScheduledGames(
    @Param('tournamentId') tournamentId: string,
  ): Promise<ScheduledGame[]> {
    const scheduledGames =
      await this.scheduledGamesService.generateScheduledGamesForTournament(
        tournamentId,
      );

    if (!scheduledGames.length) {
      throw new NotFoundException(
        'No games were generated for this tournament.',
      );
    }

    return scheduledGames;
  }
}
