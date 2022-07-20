import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@admin-bro/typeorm';
import AdminBro from 'admin-bro';
// import * as bcrypt from 'bcryptjs';

import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { Message } from 'src/chat/entities/message.entity';
import { ChatUser } from 'src/chat/entities/chatUser.entity';
import { Room } from 'src/chat/entities/room.entity';

AdminBro.registerAdapter({ Database, Resource });

@Module({
  imports: [
    AdminModule.createAdmin({
      adminJsOptions: {
        resources: [Role, FileEntity, Status, User, ChatUser, Room, Message],
        branding: {
          companyName: 'ADMIN PANEL',
          softwareBrothers: false,
          logo: false,
        },
        locale: {
          language: 'en',
          translations: {
            labels: {
              loginWelcome: 'Admin Dashboad',
            },
            messages: {
              loginWelcome:
                'please contact the tech team or an existing admin to get valid login credentials',
            },
          },
        },
      },
    }),
  ],
})
export class AdminPanelModule { }