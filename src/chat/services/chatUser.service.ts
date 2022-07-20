import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { Repository } from 'typeorm';
import { CreateChatUserDto } from '../dto/create-chat-user.dto';
import { ChatUser } from '../entities/chatUser.entity';

@Injectable()
export class ChatUserService {
  constructor(
    @InjectRepository(ChatUser)
    private chatUserRepository: Repository<ChatUser>,
  ) {}

  create(createChatUserDto: CreateChatUserDto) {
    return this.chatUserRepository.save(
      this.chatUserRepository.create(createChatUserDto),
    );
  }

  findOne(fields: EntityCondition<ChatUser>, relations: string[] = []) {
    return this.chatUserRepository.findOne({
      where: fields,
      relations,
    });
  }

  update(id: number, updateChatUserDto: Partial<CreateChatUserDto>) {
    return this.chatUserRepository.save(
      this.chatUserRepository.create({
        id,
        ...updateChatUserDto,
      }),
    );
  }
}
