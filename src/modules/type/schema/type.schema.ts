import mongoose from 'mongoose';
import { IType } from 'src/interfaces/main';
import { Document } from 'mongoose';

export type TypeDocument = IType & Document;

export const typeSchema = new mongoose.Schema<IType>({
  typeName: { type: String, required: true },
  color: { type: String, required: true },
  defaultColor: { type: String, required: true },
  visible: { type: Boolean, required: true },
});
