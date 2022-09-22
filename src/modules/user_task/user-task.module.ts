import { Module } from '@nestjs/common';
import { TaskModule } from '../task/task.module';
import { UsersModule } from '../users/users.module';
import { StatusModule } from '../status/status.module';
import { TypeModule } from '../type/type.module';
import { PrioritiesModule } from '../priority/priorities.module';
import { UserProjectController } from '../user_project/user-project.controller';
import { UserProjectService } from '../user_project/user-project.service';
import { ProjectModule } from '../projects/projects.module';
import { UserTaskController } from './user-task.controller';
import { UserTaskService } from './user-task.service';

@Module({
  imports: [UsersModule, TaskModule, StatusModule, TypeModule, PrioritiesModule, ProjectModule],
  controllers: [UserTaskController],
  providers: [UserTaskService],
  exports: [UserTaskService],
})
export class UserTaskModule {}
