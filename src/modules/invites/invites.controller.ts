import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { AuthGuard } from 'src/common/guards/authenticate.guard';
import { UserType } from 'src/enums/user.enum';
import { InvitesService } from './invites.services';

@Controller('invites')
@UseGuards(AuthGuard)
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Post()
  @Auth([
    {
      userType: UserType.ADMIN,
      permission: 'full-access',
    },
  ])
  async create() {
    return await this.invitesService.create();
  }
}
