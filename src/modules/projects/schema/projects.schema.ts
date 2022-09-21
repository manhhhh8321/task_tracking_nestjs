import { Schema } from 'mongoose';
import { Document } from 'mongoose';
import { IProject } from 'src/interfaces/main';

export type ProjectDocument = IProject & Document;

export const projectSchema = new Schema<IProject>({
  projectName: { type: String, required: true },
  members: [{ type: String, required: true }],
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  slug: { type: String, required: true },
  tasks: [{ type: String, required: true }],
  task_closed: [{ type: Object, required: true }],
});
