import { Module } from '@nestjs/common';

import { TaskController } from './task.controller';
import { TaskServices } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { taskSchema } from './schema/task.schema';
import { ProjectModule } from '../projects/projects.module';
import { UsersModule } from '../users/users.module';
import { StatusModule } from '../status/status.module';
import { TypeModule } from '../type/type.module';
import { PrioritiesModule } from '../priority/priorities.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: taskSchema }]),
    ProjectModule,
    UsersModule,
    StatusModule,
    TypeModule,
    PrioritiesModule,
  ],
  controllers: [TaskController],
  providers: [TaskServices],
  exports: [TaskServices, MongooseModule],
})
export class TaskModule {}
