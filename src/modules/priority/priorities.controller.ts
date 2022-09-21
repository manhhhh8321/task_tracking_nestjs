import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { CreatePriorityDto } from './dto/priorities.dto';
import { PrioritiesService } from './priorities.service';

@Controller()
export class PriorityController {
  constructor(private readonly prioritiesService: PrioritiesService) {}

  @Get()
  async getAll() {
    return await this.prioritiesService.getAll();
  }

  @Post()
  async create(@Body() payload: CreatePriorityDto) {
    return await this.prioritiesService.create(payload);
  }

  @Put(':id')
  async edit(@Body() payload: CreatePriorityDto, @Param('id') id: string) {
    return await this.prioritiesService.edit(id, payload);
  }
}
