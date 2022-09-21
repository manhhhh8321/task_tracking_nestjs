import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { typeSchema } from './schema/type.schema';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Type', schema: typeSchema }])],
  controllers: [TypeController],
  providers: [TypeService],
  exports: [TypeService, MongooseModule],
})
export class TypeModule {}
