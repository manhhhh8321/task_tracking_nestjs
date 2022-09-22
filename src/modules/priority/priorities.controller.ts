import { Body, Controller, Get, Post, Put, Param, UseGuards } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthGuard } from 'src/common/guards/authenticate.guard';
import { UserType } from 'src/enums/user.enum';
import { CreatePriorityDto } from './dto/priorities.dto';
import { PrioritiesService } from './priorities.service';

@Controller('priority')
@UseGuards(AuthGuard)
export class PriorityController {
  constructor(private readonly prioritiesService: PrioritiesService) {}

  @Get()
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async getAll() {
    return await this.prioritiesService.getAll();
  }

  @Post()
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async create(@Body() payload: CreatePriorityDto) {
    return await this.prioritiesService.create(payload);
  }

  @Put(':id')
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async edit(@Body() payload: CreatePriorityDto, @Param('id') id: string) {
    return await this.prioritiesService.edit(id, payload);
  }
}
