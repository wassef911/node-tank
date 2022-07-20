import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { ChatUser } from '../entities/chatUser.entity';
import { Room } from '../entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  create(createRoomDto: Partial<Room>): Promise<Room> {
    return this.roomRepository.save(this.roomRepository.create(createRoomDto));
  }

  findOne(fields: EntityCondition<Room>): Promise<Room> {
    return this.roomRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateRoomDto: Partial<Room>): Promise<Room> {
    return this.roomRepository.save(
      this.roomRepository.create({
        id,
        ...updateRoomDto,
      }),
    );
  }

  findManyWithPagination(
    paginationOptions: IPaginationOptions,
    isForHelp = true,
  ) {
    return this.roomRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: { isForHelp },
    });
  }

  setUsersInRoom(id: number, onlineUsers: ChatUser[]): Promise<Room> {
    return this.update(id, { chatUsers: onlineUsers });
  }
}
