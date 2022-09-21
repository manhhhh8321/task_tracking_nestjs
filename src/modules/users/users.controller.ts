import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthGuard } from 'src/common/guards/authenticate.guard';
import { UserType } from 'src/enums/user.enum';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get()
  async getAll() {
    return this.usersService.getAll();
  }

  @Put(':id')
  async edit(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.edit(id, payload);
  }

  @Delete(':id')
  @Auth([
    {
      userType: UserType.CLIENT,
      permission: 'read',
    },
  ])
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Get('seed/admin')
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async seed() {
    return this.usersService.seed();
  }
}
