import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePriorityDto } from './dto/priorities.dto';
import { PriorityDocument } from './schema/priority.schema';

@Injectable()
export class PrioritiesService {
  constructor(@InjectModel('Priority') private readonly priorityModel: Model<PriorityDocument>) {}

  async create(payload: CreatePriorityDto) {
    const prior = await this.priorityModel.findOne({ name: payload.priorName });

    if (prior) {
      return {
        message: 'Priority name already exist',
      };
    }

    const priority = new this.priorityModel({
      ...payload,
      visible: true,
    });

    const rs = await priority.save();
    return rs;
  }

  async getAll() {
    const rs = await this.priorityModel.find();
    return rs;
  }

  // Edit priority by id
  async edit(id: string, payload: CreatePriorityDto) {
    const prior = await this.priorityModel.findOne({ name: payload.priorName });

    if (!prior) {
      return {
        message: 'Priority not exist',
      };
    }

    const rs = await this.priorityModel.findByIdAndUpdate(id, payload);
    return rs;
  }

  // Delete priority by id
  async delete(id: string) {
    const rs = await this.priorityModel.findByIdAndDelete(id);
    return rs;
  }

  // Set visible for priority
  async setVisible(id: string) {
    const rs = await this.priorityModel.findById(id);
    rs.visible = !rs.visible;
    await rs.save();

    return rs;
  }
}
