import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/constants/base.constant';
import { CreateProjectDto } from './dto/project.dto';
import { ProjectDocument } from './schema/projects.schema';

import slug from 'slug';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schema/users.schema';

@Injectable()
export class ProjectServices {
  constructor(
    @InjectModel('Project') readonly projectModel: Model<ProjectDocument>,
    @InjectModel('User') readonly userModel: Model<UserDocument>,
  ) {}

  async checkProjectExist(slug: string) {
    const project = await this.projectModel.findOne({ slug });

    return project;
  }

  async create(payload: CreateProjectDto) {
    const d1 = new Date(payload.start_date);
    const d2 = new Date(payload.end_date);

    if (d1 > d2) {
      return {
        message: 'Start date must be less than end date',
      };
    }

    if (await this.checkProjectExist(slug(payload.projectName))) {
      return {
        message: 'Project name already exist',
      };
    }

    const project = new this.projectModel({
      ...payload,
      members: [],
      slug: slug(payload.projectName),
      tasks: [],
      task_closed: [],
    });

    const rs = await project.save();
    return rs;
  }

  // Edit project by slug
  async edit(slug: string, payload: CreateProjectDto) {
    const d1 = new Date(payload.start_date);
    const d2 = new Date(payload.end_date);

    if (d1 > d2) {
      return {
        message: 'Start date must be less than end date',
      };
    }

    if (!(await this.checkProjectExist(payload.projectName))) {
      return {
        message: 'Project name not exist',
      };
    }
    const rs = await this.projectModel.findOneAndUpdate({ slug }, payload, { new: true });
    return rs;
  }

  // Get all projects
  async getAll() {
    const projects = await this.projectModel.find();
    return projects;
  }

  // Get project by id
  async getById(id: string) {
    const project = await this.projectModel.findById(id);
    return project;
  }

  // Delete project by id
  async deleteById(id: string) {
    const project = await this.projectModel.findByIdAndDelete(id);
    return project;
  }

  // Add member to project
  async addMember(projectId: string, userId: string) {
    const project = await this.projectModel.findById(projectId);
    const user = project.members.find((member) => member === userId);

    if (user) {
      return {
        message: 'User already in project',
      };
    }
    project.members.push(userId);
    await project.save();

    const users = await this.userModel.findById(userId);
    users.allProjects.push(projectId);
    await users.save();

    return project;
  }

  // Remove member from project
  async removeMember(projectId: string, userId: string) {
    const project = await this.projectModel.findById(projectId);
    const user = project.members.find((member) => member === userId);

    if (!user) {
      return {
        message: 'User not in project',
      };
    }

    project.members = project.members.filter((member) => member !== userId);
    await project.save();

    const users = await this.userModel.findById(userId);
    users.allProjects = users.allProjects.filter((project) => project !== projectId);
    await users.save();

    return project;
  }
}
