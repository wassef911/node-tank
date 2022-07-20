import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  create(createMessageDto: Partial<Message>) {
    return this.messagesRepository.save(
      this.messagesRepository.create(createMessageDto),
    );
  }

  findManyWithPagination(paginationOptions: IPaginationOptions, id: number) {
    return this.messagesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: ['sentIn', 'createdBy'],
      where: {
        sentIn: { id },
      },
    });
  }
}
