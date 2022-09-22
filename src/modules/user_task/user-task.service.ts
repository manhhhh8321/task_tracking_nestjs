import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDocument } from '../projects/schema/projects.schema';
import { StatusDocument } from '../status/schema/status.schema';
import { CreateTaskDto } from '../task/dto/task.dto';
import { TaskDocument } from '../task/schema/task.schema';
import { UserDocument } from '../users/schema/users.schema';

@Injectable()
export class UserTaskService {
  constructor(
    @InjectModel('Task') private readonly TaskModel: Model<TaskDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Project') private readonly projectModel: Model<ProjectDocument>,
    @InjectModel('Status') private readonly StatusModel: Model<StatusDocument>,
    @InjectModel('Type') private readonly TypeModel: Model<StatusDocument>,
    @InjectModel('Priority') private readonly PriorityModel: Model<StatusDocument>,
  ) {}

  async allUserTask(userID: string) {
    const user = await this.userModel.findOne({ _id: userID });

    if (!user) {
      return {
        message: 'User not exist',
      };
    }

    const task = await this.TaskModel.find({ assignee: user._id });

    return task;
  }

  async userCreatePrivateTask(userID: string, payload: CreateTaskDto) {
    const user = await this.userModel.findOne({ _id: userID });

    if (!user) {
      return {
        message: 'User not exist',
      };
    }

    const project = await this.projectModel.findOne({ _id: payload.project });

    if (!project) {
      return {
        message: 'Project not exist',
      };
    }

    const isUserInProject = user.allProjects.find((project) => project == payload.project);

    if (!isUserInProject) {
      return {
        message: 'User not in project',
      };
    }

    const status = await this.StatusModel.findOne({ _id: payload.status });

    if (!status) {
      return {
        message: 'Status not found',
      };
    }
    let assignee = payload.assignee;

    if (assignee) {
      const assigneeUser = await this.userModel.findById(assignee);
      if (!assigneeUser) {
        return {
          message: 'Assignee not found',
        };
      }
      assignee = assigneeUser._id;
    } else {
      assignee = user._id;
    }

    const type = await this.TypeModel.findOne({ _id: payload.type });
    const priority = await this.PriorityModel.findOne({ _id: payload.priority });

    const newTask = new this.TaskModel({
      taskName: payload.taskName,
      assignee: assignee,
      status: status._id,
      project: project._id,
      type: type._id,
      priority: priority._id,
      start_date: payload.start_date,
      end_date: payload.end_date,
    });

    await newTask.save();

    await this.projectModel.updateOne(
      { _id: project._id },
      {
        $push: {
          tasks: newTask._id,
        },
      },
    );

    await this.userModel.updateOne(
      {
        _id: user._id,
      },
      {
        $push: {
          task: newTask._id,
        },
      },
    );

    return newTask;
  }

  async userEditPrivateTask(userID: string, taskID: string, payload: CreateTaskDto) {
    const user = await this.userModel.findOne({ _id: userID });

    if (!user) {
      return {
        message: 'User not exist',
      };
    }

    const project = await this.projectModel.findOne({ _id: payload.project });

    if (!project) {
      return {
        message: 'Project not exist',
      };
    }

    const isUserInProject = user.allProjects.find((project) => project == payload.project);

    if (!isUserInProject) {
      return {
        message: 'User not in project',
      };
    }

    const task = await this.TaskModel.findOne({ _id: taskID });

    if (!task) {
      return {
        message: 'Task not exist',
      };
    }

    const status = await this.StatusModel.findOne({ _id: payload.status });

    if (!status) {
      return {
        message: 'Status not found',
      };
    }

    let assignee = payload.assignee;

    if (assignee) {
      const assigneeUser = await this.userModel.findById(assignee);
      if (!assigneeUser) {
        return {
          message: 'Assignee not found',
        };
      }
      assignee = assigneeUser._id;
    } else {
      assignee = user._id;
    }

    // Check if user own task
    if (task.assignee != user._id) {
      return {
        message: 'User not own task',
      };
    }

    const type = await this.TypeModel.findOne({ _id: payload.type });
    const priority = await this.PriorityModel.findOne({ _id: payload.priority });

    await task.updateOne({
      taskName: payload.taskName,
      assignee: assignee,
      status: status._id,
      project: project._id,
      type: type._id,
      priority: priority._id,
      start_date: payload.start_date,
      end_date: payload.end_date,
    });

    return {
      message: 'Update task success',
    };
  }

  async userDeletePrivateTask(userID: string, taskID: string) {
    const user = await this.userModel.findOne({ _id: userID });
    if (!user) {
      return {
        message: 'User not exist',
      };
    }

    // Check if user own task
    const isUserOwnTask = user.task.find((task) => task == taskID);
    if (!isUserOwnTask) {
      return {
        message: 'User not own task',
      };
    }

    const task = await this.TaskModel.findOne({ _id: taskID });
    if (!task) {
      return {
        message: 'Task not exist',
      };
    }

    await task.remove();

    await this.projectModel.updateOne(
      { _id: task.project },
      {
        $pull: {
          tasks: task._id,
        },
      },
    );
    await this.userModel.updateOne({
      $pull: {
        task: task._id,
      },
    });

    return {
      message: 'Task deleted',
    };
  }
}
