import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { statusSchema } from './schema/status.schema';
import { StatusController } from './status.controller';
import { StatusServices } from './status.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Status', schema: statusSchema }])],
  controllers: [StatusController],
  providers: [StatusServices],
  exports: [StatusServices, MongooseModule],
})
export class StatusModule {}
