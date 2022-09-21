import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { TaskServices } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskServices) {}

  @Get()
  async getAll() {
    const rs = await this.taskService.getAll();
    return rs;
  }

  @Post()
  async create(@Body() payload: any) {
    const rs = await this.taskService.create(payload);
    return rs;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const rs = await this.taskService.delete(id);
    return rs;
  }

  @Put(':id')
  async edit(@Param('id') id: string, @Body() payload: any) {
    const rs = await this.taskService.edit(id, payload);
    return rs;
  }
}
