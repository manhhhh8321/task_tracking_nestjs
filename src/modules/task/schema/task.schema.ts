import mongoose from 'mongoose';
import { ITask } from 'src/interfaces/main';

export type TaskDocument = mongoose.Document & ITask;

export const taskSchema = new mongoose.Schema<ITask>({
  taskName: {
    type: String,
    required: true,
  },
  assignee: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  type: {
    type: String,
  },
  priority: {
    type: String,
  },
  end_date: {
    type: String,
    required: true,
  },
  start_date: {
    type: String,
    required: true,
  },
});
