import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ResultGamesService } from './result-games.service';
import { CreateResultGameDto } from './dto/create-result-game.dto';
import { UpdateResultGameDto } from './dto/update-result-game.dto';
import { ResultGame } from './entities/result-game.entity';

@ApiTags('Result Games')
@ApiBearerAuth()
@Controller('result-games')
export class ResultGamesController {
  constructor(private readonly resultGamesService: ResultGamesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new result game' })
  @ApiResponse({
    status: 201,
    description: 'The result game has been successfully created.',
    type: ResultGame,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createResultGameDto: CreateResultGameDto) {
    return this.resultGamesService.create(createResultGameDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all result games, optionally filtered by tournament',
  })
  @ApiQuery({
    name: 'tournamentId',
    required: false,
    description: 'Tournament ID to filter the result games',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all result games',
    type: [ResultGame],
  })
  findAll(@Query('tournamentId') tournamentId?: string) {
    return this.resultGamesService.findAll(tournamentId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a result game by ID' })
  @ApiParam({ name: 'id', description: 'ID of the result game' })
  @ApiResponse({
    status: 200,
    description: 'Return the result game',
    type: ResultGame,
  })
  @ApiResponse({ status: 404, description: 'Result game not found' })
  findOne(@Param('id') id: string) {
    return this.resultGamesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a result game by ID' })
  @ApiParam({ name: 'id', description: 'ID of the result game' })
  @ApiResponse({
    status: 200,
    description: 'The result game has been updated',
    type: ResultGame,
  })
  @ApiResponse({ status: 404, description: 'Result game not found' })
  update(
    @Param('id') id: string,
    @Body() updateResultGameDto: UpdateResultGameDto,
  ) {
    return this.resultGamesService.update(id, updateResultGameDto);
  }
}
