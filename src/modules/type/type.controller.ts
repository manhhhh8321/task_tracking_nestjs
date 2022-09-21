import { Controller, Get, Post, Body, Res, UseGuards, Put, Patch, Param } from '@nestjs/common';
import { CreateTypeDto } from './dto/type.dto';
import { TypeService } from './type.service';

@Controller()
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  async getAll() {
    return await this.typeService.getAll();
  }

  @Post()
  async create(@Body() payload: CreateTypeDto) {
    return await this.typeService.create(payload);
  }

  @Put(':id')
  async edit(@Body() payload: CreateTypeDto, @Param('id') id: string) {
    return await this.typeService.edit(id, payload);
  }

  @Patch(':id')
  async setVisible(@Param('id') id: string) {
    return await this.typeService.setVisible(id);
  }
}
