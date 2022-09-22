import { Controller, Body, Get, Post, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/common/guards/authenticate.guard';
import { UserType } from 'src/enums/user.enum';
import { CreateTaskDto } from '../task/dto/task.dto';
import { UserTaskService } from './user-task.service';

@Controller('user-task')
@UseGuards(AuthGuard)
export class UserTaskController {
  constructor(private readonly userTaskService: UserTaskService) {}

  @Get(':id')
  @Auth([
    {
      userType: UserType.CLIENT,
      permission: 'read',
    },
  ])
  async getAll(@Param('id') id: string, @User() users: string) {
    return await this.userTaskService.allUserTask(id);
  }

  @Post(':id')
  @Auth([
    {
      userType: UserType.CLIENT,
      permission: 'read',
    },
  ])
  async createTask(@Param('id') id: string, @User() users: string, @Body() payload: CreateTaskDto) {
    return await this.userTaskService.userCreatePrivateTask(id, payload);
  }

  @Put(':id/:taskID')
  @Auth([
    {
      userType: UserType.CLIENT,
      permission: 'read',
    },
  ])
  async editTask(
    @Param('id') id: string,
    @Param('taskID') taskID: string,
    @User() users: string,
    @Body() payload: CreateTaskDto,
  ) {
    return await this.userTaskService.userEditPrivateTask(id, taskID, payload);
  }

  @Delete(':id/:taskID')
  @Auth([
    {
      userType: UserType.CLIENT,
      permission: 'read',
    },
  ])
  async deleteTask(@Param('id') id: string, @Param('taskID') taskID: string, @User() users: string) {
    return await this.userTaskService.userDeletePrivateTask(id, taskID);
  }
}
