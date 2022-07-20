import {
  Controller,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { MessageService } from '../services/message.service';

@ApiTags('Chat')
@Controller({
  path: 'messages',
})
export class MessagesController {
  constructor(protected readonly messageService: MessageService) {}

  @Get(':roomId')
  @ApiOperation({ summary: 'messages history with <limit = 50>' })
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Param('roomId') roomId: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    return infinityPagination(
      await this.messageService.findManyWithPagination(
        {
          page,
          limit,
        },
        roomId,
      ),
      { page, limit },
    );
  }
}
