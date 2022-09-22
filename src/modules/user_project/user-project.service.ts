import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectDocument } from '../projects/schema/projects.schema';
import { StatusDocument } from '../status/schema/status.schema';
import { CreateTaskDto } from '../task/dto/task.dto';
import { TaskDocument } from '../task/schema/task.schema';
import { UserDocument } from '../users/schema/users.schema';

@Injectable()
export class UserProjectService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('Project') private readonly projectModel: Model<ProjectDocument>,
    @InjectModel('Task') private readonly TaskModel: Model<TaskDocument>,
    @InjectModel('Status') private readonly StatusModel: Model<StatusDocument>,
  ) {}

  async allUserProject(userID: string) {
    const user = await this.userModel.findOne({ _id: userID });

    if (!user) {
      return {
        message: 'User not exist',
      };
    }

    const project = await this.projectModel.find({ _id: { $in: user.allProjects } });

    return project;
  }

  async userDetailProject(userID: string, projectID: string) {
    const user = await this.userModel.findOne({ _id: userID });

    if (!user) {
      return {
        message: 'User not exist',
      };
    }

    const project = await this.projectModel.findOne({ _id: projectID });

    if (!project) {
      return {
        message: 'Project not exist',
      };
    }

    const isUserInProject = user.allProjects.find((project) => project == projectID);

    if (!isUserInProject) {
      return {
        message: 'User not in project',
      };
    }

    const pushArray = [];
    // Get username from user model
    // Count number of records in task where assignee = username and project id = projectId
    const countTask = await this.TaskModel.countDocuments({
      assignee: user._id,
      project: project._id,
    });

    const currentTask = countTask;
    const closedTask = project!.task_closed.length;
    const obj = {
      projectName: project!.projectName,
      allTasks: currentTask + closedTask,
      closedTasks: closedTask,
      // Check process if it is number or not, if not then return 0
      process: isNaN((closedTask / currentTask) * 100) ? 0 : (closedTask / currentTask) * 100,
      start_date: project!.start_date,
      end_date: project!.end_date,
    };
    pushArray.push(obj);

    return obj;
  }

  async allTaskInProject(userID: string, projectID: string) {
    const user = await this.userModel.findOne({ _id: userID });

    if (!user) {
      return {
        message: 'User not exist',
      };
    }

    const project = await this.projectModel.findOne({ _id: projectID });

    if (!project) {
      return {
        message: 'Project not exist',
      };
    }

    const isUserInProject = user.allProjects.find((project) => project == projectID);

    if (!isUserInProject) {
      return {
        message: 'User not in project',
      };
    }

    const allStatus = await this.StatusModel.find();
    const allTasks = await this.TaskModel.find({ project: project._id });

    const statusArr = allStatus.map((item) => item.statusName);
    const obj: Record<string, any> = {};

    statusArr.forEach((el) => {
      obj[el] = [];
    });

    // Find all task of user in project
    const allTaskOfUser = allTasks.filter((item) => {
      return item.assignee.toString() === user!._id.toString() && item.project.toString() === project!._id.toString();
    });

    allTaskOfUser.forEach((item) => {
      const itemStatusName = allStatus.find((status) => status._id.toString() === item.status.toString());
      obj[`${itemStatusName.statusName}`].push(item);
    });

    if (!obj) {
      return {
        message: 'No task found',
      };
    }

    return obj;
  }

  async userInProjectCreateTask(userID: string, projectID: string, payload: CreateTaskDto) {
    const user = await this.userModel.findOne({ _id: userID });

    if (!user) {
      return {
        message: 'User not exist',
      };
    }

    const project = await this.projectModel.findOne({ _id: projectID });

    if (!project) {
      return {
        message: 'Project not exist',
      };
    }

    const isUserInProject = user.allProjects.find((project) => project == projectID);

    if (!isUserInProject) {
      return {
        message: 'User not in project',
      };
    }

    const task = await this.TaskModel.create({
      taskName: payload.taskName,
      assignee: user._id,
      project: project._id,
      status: payload.status,
      type: payload.type,
      priority: payload.priority,
      start_date: payload.start_date,
      end_date: payload.end_date,
    });

    await this.projectModel.updateOne(
      { _id: projectID },
      {
        $push: {
          tasks: task._id,
        },
      },
    );

    await this.userModel.updateOne({ _id: user._id }, { $push: { task: task._id } });

    return task;
  }

  async userInProjectUpdateTask(userID: string, projectID: string, taskID: string, payload: CreateTaskDto) {
    const user = await this.userModel.findOne({ _id: userID });

    if (!user) {
      return {
        message: 'User not exist',
      };
    }

    const project = await this.projectModel.findOne({ _id: projectID });

    if (!project) {
      return {
        message: 'Project not exist',
      };
    }

    const isUserInProject = user.allProjects.find((project) => project == projectID);

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

    const isUserOwnTask = task.assignee.toString() === user._id.toString();

    if (!isUserOwnTask) {
      return {
        message: 'User not own task',
      };
    }

    await task.updateOne({
      taskName: payload.taskName,
      assignee: user._id,
      project: project._id,
      status: payload.status,
      type: payload.type,
      priority: payload.priority,
      start_date: payload.start_date,
      end_date: payload.end_date,
    });

    return task;
  }
  async userInProjectDeleteTask(userID: string, projectID: string, taskID: string) {
    const user = await this.userModel.findOne({ _id: userID });

    if (!user) {
      return {
        message: 'User not exist',
      };
    }

    const project = await this.projectModel.findOne({ _id: projectID });

    if (!project) {
      return {
        message: 'Project not exist',
      };
    }

    const isUserInProject = user.allProjects.find((project) => project == projectID);

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

    const isUserOwnTask = task.assignee.toString() === user._id.toString();

    if (!isUserOwnTask) {
      return {
        message: 'User not own task',
      };
    }

    await task.deleteOne();

    await this.projectModel.updateOne(
      { _id: project._id },
      {
        $pull: {
          tasks: task._id,
        },
      },
    );
    await this.userModel.updateOne(
      { _id: user._id },
      {
        $pull: {
          task: task._id,
        },
      },
    );

    return task;
  }
}
