import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { RoomService } from '../services/room.service';

@ApiTags('Chat')
@Controller({
  path: 'room',
})
export class RoomController {
  constructor(protected readonly roomService: RoomService) { }

  @Get(':name')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'includes logged in users list' })
  async findOne(@Param('name') name: string) {
    return await this.roomService.findOne({ name: name });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'only get nodetank rooms' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    return infinityPagination(
      await this.roomService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }
}
