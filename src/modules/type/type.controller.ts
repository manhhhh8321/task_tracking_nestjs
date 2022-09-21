import { Controller, Get, Post, Body, Res, UseGuards, Put, Patch, Param } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthGuard } from 'src/common/guards/authenticate.guard';
import { UserType } from 'src/enums/user.enum';
import { CreateTypeDto } from './dto/type.dto';
import { TypeService } from './type.service';

@Controller('type')
@UseGuards(AuthGuard)
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async getAll() {
    return await this.typeService.getAll();
  }

  @Post()
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async create(@Body() payload: CreateTypeDto) {
    return await this.typeService.create(payload);
  }

  @Put(':id')
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async edit(@Body() payload: CreateTypeDto, @Param('id') id: string) {
    return await this.typeService.edit(id, payload);
  }

  @Patch(':id')
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async setVisible(@Param('id') id: string) {
    return await this.typeService.setVisible(id);
  }
}
