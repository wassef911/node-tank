import { UseFilters } from '@nestjs/common';
import {
  BaseWsExceptionFilter,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { EVENT } from '../chat.enum';
import { IHandshake, IMsgToBroadcast } from '../chat.types';
import { ChatUser } from '../entities/chatUser.entity';
import { Room } from '../entities/room.entity';
import { ChatUserService } from '../services/chatUser.service';
import { MessageService } from '../services/message.service';
import { RoomService } from '../services/room.service';

export class BaseGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() io: Server;

  constructor(
    protected readonly chatUserService: ChatUserService,
    protected readonly roomService: RoomService,
    protected readonly messageService: MessageService,
  ) { }

  handleConnection(@ConnectedSocket() client: Socket) {
    undefined;
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    try {
      const { chatUser } = this.getHandshakeQuery(client);
      /*
       * get disconnected user and room
       */

      const user: ChatUser = await this.chatUserService.findOne(
        {
          phone_number: chatUser.phone_number,
        },
        ['rooms'],
      );

      user.rooms.forEach(async (r) => {
        let room: Room = await this.roomService.findOne({ name: r.name });
        /*
         * remove disconnected user from connected list
         * broadcast the list
         */
        room = await this.roomService.setUsersInRoom(
          room.id,
          room.chatUsers.filter((u) => u.id !== user.id),
        );
        client.broadcast.to(r.name).emit(EVENT.LOGGED_IN_LIST, room.chatUsers);
      });

      await this.chatUserService.update(user.id, { rooms: [] });
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  getHandshakeQuery(@ConnectedSocket() client: Socket): IHandshake {
    const { name, phone_number, establishmentName, type, description } =
      client.handshake.query;
    return {
      // @ts-ignore
      chatUser: { name, phone_number, establishmentName, type, description },
    };
  }

  @UseFilters(new BaseWsExceptionFilter())
  @SubscribeMessage(EVENT.TO_SERVER)
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() msg: IMsgToBroadcast,
  ) {
    try {
      const { chatUser } = this.getHandshakeQuery(client);
      /*
       * get sender and room
       */
      const user = await this.chatUserService.findOne({
        phone_number: chatUser.phone_number,
      });
      const room = await this.roomService.findOne({ name: msg.roomName });
      const userHasJoined = Array.from(client.rooms).includes(msg.roomName);

      if (room && user && userHasJoined) {
        /*
         * create message and broadcast it to intended room
         */

        const message = await this.messageService.create({
          ...msg,
          createdBy: user,
          sentIn: room,
        });
        delete message.sentIn;
        client.broadcast.to(msg.roomName).emit(EVENT.CHAT_MSG, message);
        if (msg.forHelp)
          client.broadcast
            .to(msg.roomName)
            .emit(EVENT.FOR_HELP, msg.roomName, room.id);
      }
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @UseFilters(new BaseWsExceptionFilter())
  @SubscribeMessage(EVENT.JOIN_ROOM)
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomName: string,
  ) {
    try {
      const { chatUser } = this.getHandshakeQuery(client);
      let room: Room = await this.roomService.findOne({ name: roomName });
      if (!room) room = await this.roomService.create({ name: roomName });
      const user: ChatUser = await this.chatUserService.findOne({
        phone_number: chatUser.phone_number,
      });

      if (room && user) {
        // skip first room since it's personal
        Array.from(client.rooms)
          .slice(1)
          .forEach(async (r) => await client.leave(r));
        room = await this.roomService.setUsersInRoom(
          room.id,
          room.chatUsers ? [...room.chatUsers, user] : [user],
        );
        await this.chatUserService.update(user.id, {
          rooms: user.rooms ? [...user.rooms, room] : [room],
        });
        await client.join(roomName);
        // no need to broadcast ... just emmit it
        client.broadcast
          .to(roomName)
          .emit(EVENT.LOGGED_IN_LIST, room.chatUsers);
      }
    } catch (error) {
      throw new WsException(error.message);
    }
  }
}
