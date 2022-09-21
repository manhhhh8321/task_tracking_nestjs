import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthGuard } from 'src/common/guards/authenticate.guard';
import { UserType } from 'src/enums/user.enum';
import { CreateProjectDto } from './dto/project.dto';
import { ProjectServices } from './projects.service';

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(private readonly projectServices: ProjectServices) {}

  @Post()
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async create(@Body() payload: CreateProjectDto) {
    return this.projectServices.create(payload);
  }

  @Put(':slug')
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async edit(@Param('slug') slug: string, @Body() payload: CreateProjectDto) {
    return this.projectServices.edit(slug, payload);
  }

  @Get()
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async getAll() {
    return this.projectServices.getAll();
  }

  @Delete(':id')
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async delete(@Param('id') id: string) {
    return this.projectServices.deleteById(id);
  }

  @Patch(':id')
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async addMember(@Param('id') id: string, @Body() payload: { userId: string }) {
    return this.projectServices.addMember(id, payload.userId);
  }
}
