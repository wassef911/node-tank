import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessagesController } from './controllers/message.controller';
import { RoomController } from './controllers/room.contoller';
import { ChatUser } from './entities/chatUser.entity';
import { Message } from './entities/message.entity';
import { Room } from './entities/room.entity';
import { ChatUserService } from './services/chatUser.service';
import { MessageService } from './services/message.service';
import { RoomService } from './services/room.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatUser, Message, Room])],
  controllers: [MessagesController, RoomController],
  providers: [
    ChatUserService,
    MessageService,
    RoomService,
  ],
  exports: [],
})
export class ChatModule { }
