import { Controller, Get, Put, Patch, Post, Param, Body, UseGuards, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/common/guards/authenticate.guard';
import { UserType } from 'src/enums/user.enum';
import { CreateTaskDto } from '../task/dto/task.dto';

import { UserProjectService } from './user-project.service';

@Controller('user-project')
@UseGuards(AuthGuard)
export class UserProjectController {
  constructor(private readonly userProjectService: UserProjectService) {}

  @Get(':id')
  @Auth([
    {
      userType: UserType.CLIENT,
      permission: 'read',
    },
  ])
  async getAll(@Param('id') id: string, @User() user: string) {
    return await this.userProjectService.allUserProject(id);
  }

  @Get(':id/:projectID')
  @Auth([
    {
      userType: UserType.CLIENT,
      permission: 'read',
    },
  ])
  async create(@Param('id') id: string, @Param('projectID') projectID: string, @User() user: string) {
    return await this.userProjectService.userDetailProject(id, projectID);
  }

  @Get(':id/:projectID/task')
  @Auth([
    {
      userType: UserType.CLIENT,
      permission: 'read',
    },
  ])
  async allTaskOfProject(@Param('id') id: string, @Param('projectID') projectID: string, @User() user: string) {
    return await this.userProjectService.allTaskInProject(id, projectID);
  }

  @Post(':id/:projectID')
  @Auth([
    {
      userType: UserType.CLIENT,
      permission: 'read',
    },
  ])
  async createProjectTask(
    @Param('id') id: string,
    @Param('projectID') projectID: string,
    @User() user: string,
    @Body() payload: CreateTaskDto,
  ) {
    return await this.userProjectService.userInProjectCreateTask(id, projectID, payload);
  }

  @Put(':id/:projectID')
  @Auth([
    {
      userType: UserType.CLIENT,
      permission: 'read',
    },
  ])
  async editProjectTask(
    @Param('id') id: string,
    @Param('projectID') projectID: string,
    @Param('taskID') taskID: string,
    @User() user: string,
    @Body() payload: CreateTaskDto,
  ) {
    return await this.userProjectService.userInProjectUpdateTask(id, projectID, taskID, payload);
  }

  @Delete(':id/:projectID/:taskID')
  @Auth([
    {
      userType: UserType.CLIENT,
      permission: 'read',
    },
  ])
  async deleteProjectTask(
    @Param('id') id: string,
    @Param('projectID') projectID: string,
    @Param('taskID') taskID: string,
    @User() user: string,
  ) {
    return await this.userProjectService.userInProjectDeleteTask(id, projectID, taskID);
  }
}
