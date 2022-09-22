import { Controller, Get, Post, Delete, Body, Param, Put, UseGuards } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthGuard } from 'src/common/guards/authenticate.guard';
import { UserType } from 'src/enums/user.enum';
import { TaskServices } from './task.service';

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskServices) {}

  @Get()
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async getAll() {
    const rs = await this.taskService.getAll();
    return rs;
  }

  @Post()
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async create(@Body() payload: any) {
    const rs = await this.taskService.create(payload);
    return rs;
  }

  @Delete(':id')
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async delete(@Param('id') id: string) {
    const rs = await this.taskService.delete(id);
    return rs;
  }

  @Put(':id')
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async edit(@Param('id') id: string, @Body() payload: any) {
    const rs = await this.taskService.edit(id, payload);
    return rs;
  }
}
