import { Schema } from 'mongoose';
import { IInvite } from 'src/interfaces/main';
import { Document } from 'mongoose';

export type InviteDocument = IInvite & Document;

export const inviteSchema = new Schema({
  inviteID: { type: String, required: true },
});
