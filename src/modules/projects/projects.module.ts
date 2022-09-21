import { Module } from '@nestjs/common';

import { ProjectServices } from './projects.service';
import { ProjectsController } from './projects.controller';
import { projectSchema } from './schema/projects.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Project', schema: projectSchema }]), UsersModule],
  controllers: [ProjectsController],
  providers: [ProjectServices],
  exports: [ProjectServices, MongooseModule],
})
export class ProjectModule {}
