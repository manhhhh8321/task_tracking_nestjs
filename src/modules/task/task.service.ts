import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PriorityDocument } from '../priority/schema/priority.schema';
import { ProjectDocument } from '../projects/schema/projects.schema';
import { StatusDocument } from '../status/schema/status.schema';
import { TypeDocument } from '../type/schema/type.schema';
import { UserDocument } from '../users/schema/users.schema';
import { CreateTaskDto } from './dto/task.dto';
import { TaskDocument } from './schema/task.schema';

export class TaskServices {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskDocument>,
    @InjectModel('Status') private readonly statusModel: Model<StatusDocument>,
    @InjectModel('Type') private readonly typeModel: Model<TypeDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Project') private readonly projectModel: Model<ProjectDocument>,
    @InjectModel('Priority') private readonly priorityModel: Model<PriorityDocument>,
  ) {}

  async create(payload: CreateTaskDto) {
    const { taskName, status, type, assignee, project, priority } = payload;

    // Check if payload is empty

    const statuses = await this.statusModel.findOne({ _id: payload.status });
    const types = await this.typeModel.findOne({ _id: payload.type });
    const assignees = await this.userModel.findOne({ _id: payload.assignee });
    const projects = await this.projectModel.findOne({ _id: payload.project });
    const priorities = await this.priorityModel.findOne({ _id: payload.priority });

    if (!statuses) {
      return {
        message: 'Status not exist',
      };
    }

    if (!types) {
      return {
        message: 'Type not exist',
      };
    }

    if (!assignees) {
      return {
        message: 'Assignee not exist',
      };
    }

    if (!projects) {
      return {
        message: 'Project not exist',
      };
    }

    if (!priorities) {
      return {
        message: 'Priority not exist',
      };
    }

    // Check if user is member of project
    const isUserInProject = projects.members.includes(assignees._id);

    if (!isUserInProject) {
      return {
        message: 'User is not member of project',
      };
    }

    let defaultStatus;
    const st = await this.statusModel.findOne({ isDefault: true });

    if (!status) {
      defaultStatus = st._id;
    } else {
      defaultStatus = status;
    }

    const newTask = new this.taskModel({
      taskName: taskName,
      status: defaultStatus,
      type: types._id,
      assignee: assignees._id,
      project: projects._id,
      priority: priorities._id,
      start_date: payload.start_date,
      end_date: payload.end_date,
    });

    const rs = await newTask.save();
    // Update user task
    await this.userModel.updateOne({ _id: assignees._id }, { $push: { task: newTask._id } });
    await this.projectModel.updateOne({ _id: projects._id }, { $push: { tasks: newTask._id } });

    return rs;
  }

  async getAll() {
    const rs = await this.taskModel.find();
    return rs;
  }

  // Edit task by id
  async edit(id: string, payload: CreateTaskDto) {
    const task = await this.taskModel.findOne({ name: payload.taskName });
    const { status } = payload;

    if (!task) {
      return {
        message: 'Task name not exist',
      };
    }

    const statuses = await this.statusModel.findOne({ _id: payload.status });
    const types = await this.typeModel.findOne({ _id: payload.type });
    const assignees = await this.userModel.findOne({ _id: payload.assignee });
    const projects = await this.projectModel.findOne({ _id: payload.project });
    const priorities = await this.priorityModel.findOne({ _id: payload.priority });

    if (!statuses) {
      return {
        message: 'Status not exist',
      };
    }

    if (!types) {
      return {
        message: 'Type not exist',
      };
    }

    if (!assignees) {
      return {
        message: 'Assignee not exist',
      };
    }

    if (!projects) {
      return {
        message: 'Project not exist',
      };
    }

    if (!priorities) {
      return {
        message: 'Priority not exist',
      };
    }

    // Check if user is member of project
    const isUserInProject = projects.members.includes(assignees._id);

    if (!isUserInProject) {
      return {
        message: 'User is not member of project',
      };
    }

    let defaultStatus: string;
    const st = await this.statusModel.findOne({ isDefault: true });

    if (!status) {
      defaultStatus = st._id;
    } else {
      defaultStatus = status;
    }

    const rs = await this.taskModel.findByIdAndUpdate(id, {
      taskName: payload.taskName,
      status: defaultStatus,
      type: types._id,
      assignee: assignees._id,
      project: projects._id,
      priority: priorities._id,
      start_date: payload.start_date,
      end_date: payload.end_date,
    });

    return `Update task ${rs.taskName} successfully`;
  }

  // Delete task
  async delete(id: string) {
    const rs = await this.taskModel.findByIdAndDelete(id);

    await this.userModel.updateOne({ _id: rs.assignee }, { $pull: { task: rs._id } });

    await this.projectModel.updateOne({ _id: rs.project }, { $pull: { tasks: rs._id } });

    return rs;
  }
}
