import { EntityHelper } from 'src/utils/entity-helper';
import {
  CreateDateColumn,
  Entity,
  ManyToMany,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  OneToMany,
  AfterLoad,
  Repository,
} from 'typeorm';
import { RoomService } from '../services/room.service';
import { ChatUser } from './chatUser.entity';
import { Message } from './message.entity';

@Entity({ name: 'Rooms' })
export class Room extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @ManyToMany(() => ChatUser, (u) => u.rooms, {
    eager: true,
    cascade: true,
  })
  @JoinTable()
  chatUsers?: ChatUser[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Message, (m) => m.sentIn)
  messages: Message[];

  @Column({ default: false })
  isForHelp: boolean;
}
