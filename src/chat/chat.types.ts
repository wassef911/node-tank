import { CreateChatUserDto } from './dto/create-chat-user.dto';
import { ChatUser } from './entities/chatUser.entity';

export interface IMsgToBroadcast {
  roomName: string;
  text: string;
  forHelp: boolean;
}

export interface IRooms {
  id: string;
  users: ChatUser[];
}

export interface IHandshake {
  chatUser: CreateChatUserDto;
}
