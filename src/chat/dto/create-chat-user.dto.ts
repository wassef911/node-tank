import { IsInt, MaxLength, MinLength } from 'class-validator';
import { chatUserType } from '../chat.enum';
import { ChatUser } from '../entities/chatUser.entity';
import { Room } from '../entities/room.entity';

export class CreateChatUserDto implements Partial<ChatUser> {
  @MinLength(3, {
    message: 'name is too short',
  })
  @MaxLength(20, {
    message: 'name is too long',
  })
  name: string;

  @IsInt()
  @MinLength(8)
  @MinLength(8)
  phone_number: string;

  establishmentName: string;

  type?: chatUserType = chatUserType.PERSON;

  description?: string = chatUserType.PERSON;

  rooms: Room[];
}
