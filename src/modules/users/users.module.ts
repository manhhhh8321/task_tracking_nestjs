import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userSchema } from './schema/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteModule } from '../invites/invites.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }]), InviteModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
