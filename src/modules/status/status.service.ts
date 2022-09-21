import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createStatusDto } from './dto/status.dto';
import { StatusDocument } from './schema/status.schema';

export class StatusServices {
  constructor(@InjectModel('Status') private readonly statusModel: Model<StatusDocument>) {}

  async create(payload: createStatusDto) {
    const status = await this.statusModel.findOne({ statusName: payload.statusName });

    if (status) {
      return {
        message: 'Status name already exist',
      };
    }

    const newStatus = new this.statusModel({
      ...payload,
      visible: true,
    });

    const rs = await newStatus.save();
    return rs;
  }

  async getAll() {
    const rs = await this.statusModel.find().sort({ orderNumber: 1 });
    return rs;
  }

  // Edit status by id
  async edit(id: string, payload: createStatusDto) {
    const status = await this.statusModel.findOne({ statusName: payload.statusName });

    if (!status) {
      return {
        message: 'Status name not exist',
      };
    }

    const rs = await this.statusModel.findByIdAndUpdate(id, payload);
    return rs;
  }

  // Set visible for status
  async setVisible(id: string) {
    const rs = await this.statusModel.findById(id);
    rs.visible = !rs.visible;
    await rs.save();

    return rs;
  }
}
