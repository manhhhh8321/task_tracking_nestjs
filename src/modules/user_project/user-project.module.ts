import { Module } from '@nestjs/common';
import { ProjectModule } from '../projects/projects.module';
import { StatusModule } from '../status/status.module';
import { TaskModule } from '../task/task.module';
import { UsersModule } from '../users/users.module';
import { UserProjectController } from './user-project.controller';
import { UserProjectService } from './user-project.service';

@Module({
  imports: [UsersModule, ProjectModule, TaskModule, StatusModule],
  controllers: [UserProjectController],
  providers: [UserProjectService],
  exports: [UserProjectService],
})
export class UserProjectModule {}
