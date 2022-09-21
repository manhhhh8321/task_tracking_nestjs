import { Schema } from 'mongoose';
import { Users } from 'src/interfaces/main';
import { Document } from 'mongoose';

export type UserDocument = Users & Document;

const userSchema = new Schema<Users>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  birthday: { type: String, required: true },
  email: { type: String, required: true },
  inviteID: { type: String, required: true },
  active: { type: Boolean, required: true },
  defaultProject: { type: Object, required: true },
  allProjects: [{ type: String, required: true }],
  task: [{ type: String, required: true }],
  userType: { type: String, required: true },
  permissions: [{ type: String, required: true }],
});

export { userSchema };
