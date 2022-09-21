import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PriorityController } from './priorities.controller';
import { PrioritiesService } from './priorities.service';
import { prioritySchema } from './schema/priority.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Priority', schema: prioritySchema }])],
  controllers: [PriorityController],
  providers: [PrioritiesService],
  exports: [PrioritiesService, MongooseModule],
})
export class PrioritiesModule {}
