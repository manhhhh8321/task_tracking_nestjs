import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InviteDocument } from '../users/schema/invites.schema';

import { randomUUID } from 'crypto';

@Injectable()
export class InvitesService {
  constructor(@InjectModel('Invite') private readonly inviteModel: Model<InviteDocument>) {}

  async create() {
    const newInviteId = randomUUID();
    const invite = new this.inviteModel({
      inviteID: newInviteId,
    });

    const rs = await invite.save();
    return rs;
  }
}
