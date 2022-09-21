import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { inviteSchema } from '../users/schema/invites.schema';
import { InvitesController } from './invites.controller';
import { InvitesService } from './invites.services';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Invite', schema: inviteSchema }])],
  controllers: [InvitesController],
  providers: [InvitesService],
  exports: [InviteModule, MongooseModule],
})
export class InviteModule {}
