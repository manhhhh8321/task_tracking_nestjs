import { Controller, Get, Put, Post, Param, Body, Patch, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthGuard } from 'src/common/guards/authenticate.guard';
import { UserType } from 'src/enums/user.enum';
import { createStatusDto } from './dto/status.dto';
import { StatusServices } from './status.service';

@Controller('status')
@UseGuards(AuthGuard)
export class StatusController {
  constructor(private readonly statusService: StatusServices) {}

  @Get()
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async getAll() {
    const rs = await this.statusService.getAll();
    return rs;
  }

  @Post()
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async create(@Body() payload: createStatusDto) {
    const rs = await this.statusService.create(payload);
    return rs;
  }

  @Put(':id')
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async edit(@Param('id') id: string, @Body() payload: createStatusDto) {
    const rs = await this.statusService.edit(id, payload);
    return rs;
  }

  @Patch(':id')
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async setVisible(@Param('id') id: string) {
    const rs = await this.statusService.setVisible(id);
    return rs;
  }
}
