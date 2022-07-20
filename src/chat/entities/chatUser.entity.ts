import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { chatUserType } from '../chat.enum';
import { Message } from './message.entity';
import { Room } from './room.entity';
@Entity({ name: 'ChatUser' })
export class ChatUser extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false, unique: true })
  phone_number: string;

  @Column()
  establishmentName: string;

  @Column({
    type: 'enum',
    enum: chatUserType,
    default: chatUserType.PERSON,
  })
  type: chatUserType;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Message, (m) => m.createdBy)
  messages: Message[];

  @ManyToMany(() => Room, (m) => m.chatUsers)
  rooms: Room[];
}
