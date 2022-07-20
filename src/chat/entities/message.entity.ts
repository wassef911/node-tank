import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Room } from './room.entity';
import { ChatUser } from './chatUser.entity';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity({ name: 'Message' })
export class Message extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Room, (r) => r.messages, { onDelete: 'SET NULL' })
  @JoinColumn()
  sentIn: Room;

  @RelationId((r: Message) => r.sentIn)
  sentInId: number;

  @ManyToOne(() => ChatUser, (m) => m.messages, { onDelete: 'SET NULL' })
  @JoinColumn()
  createdBy: ChatUser;

  @RelationId((r: Message) => r.createdBy)
  createdById: number;

  @CreateDateColumn()
  createdAt: Date;
}
