import { IPriority } from 'src/interfaces/main';
import { Document } from 'mongoose';
import { Schema } from 'mongoose';

export type PriorityDocument = IPriority & Document;

export const prioritySchema = new Schema<IPriority>({
  priorName: { type: String, required: true },
  orderNumber: { type: Number, required: true },
  visible: { type: Boolean, required: true },
});
