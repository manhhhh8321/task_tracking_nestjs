import mongoose from 'mongoose';
import { IStatus } from 'src/interfaces/main';

export type StatusDocument = IStatus & mongoose.Document;

export const statusSchema = new mongoose.Schema<IStatus>({
  statusName: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: true,
  },
  currentStatus: {
    type: String,
    default: 'active',
  },
  orderNumber: {
    type: Number,
    default: 0,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});
