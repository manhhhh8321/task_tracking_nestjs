import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTypeDto } from './dto/type.dto';
import { TypeDocument } from './schema/type.schema';

@Injectable()
export class TypeService {
  constructor(@InjectModel('Type') private readonly typeModel: Model<TypeDocument>) {}

  async create(payload: any) {
    const type = await this.typeModel.findOne({ name: payload.typeName });

    if (type) {
      return {
        message: 'Type name already exist',
      };
    }

    const newType = new this.typeModel({
      ...payload,
      defaultColor: 'white',
      visible: true,
    });

    const rs = await newType.save();

    const allTypes = await this.typeModel.find();

    for (let el of allTypes) {
      if (el.typeName === 'default') {
        el.defaultColor = 'white';
      }
      if (el.typeName === 'bug') {
        el.defaultColor = 'red';
      }
      if (el.typeName === 'feature') {
        el.defaultColor = 'blue';
      }
    }

    return rs;
  }

  async getAll() {
    const rs = await this.typeModel.find();
    return rs;
  }

  // Edit type by id
  async edit(id: string, payload: CreateTypeDto) {
    const type = await this.typeModel.findOne({ name: payload.typeName });

    if (!type) {
      return {
        message: 'Type name not exist',
      };
    }

    const rs = await this.typeModel.findByIdAndUpdate(id, payload);
    return rs;
  }

  // Set visible for type
  async setVisible(id: string) {
    const rs = await this.typeModel.findById(id);
    rs.visible = !rs.visible;
    await rs.save();

    return rs;
  }
}
