import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/constants/base.constant';
import { UserType } from 'src/enums/user.enum';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { userSchema, UserDocument } from './schema/users.schema';

import { EncryptHelper } from 'src/helpers/encrypt.helper';
import { InviteDocument } from './schema/invites.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('Invite') private readonly inviteModel: Model<InviteDocument>,
  ) {}

  async checkEmailExist(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async checkUserExist(username: string) {
    const user = await this.userModel.findOne({ username });
    return user;
  }
  // Create user
  async create(payload: CreateUserDto) {
    if (await this.checkEmailExist(payload.email)) {
      return {
        message: 'Email already exist',
      };
    }

    if (await this.checkUserExist(payload.username)) {
      return {
        message: 'Username already exist',
      };
    }

    // Check invite id between user and invite, then delete invite
    const invite = await this.inviteModel.findOne({ inviteID: payload.inviteID });

    if (!invite) {
      return {
        message: 'Invite not found',
      };
    }

    const user = new this.userModel({
      username: payload.username,
      name: payload.name,
      birthday: payload.birthday,
      active: true,
      email: payload.email,
      password: await EncryptHelper.hash(payload.password),
      defaultProject: '',
      allProjects: [],
      userType: UserType.CLIENT,
      inviteID: payload.inviteID,
    });

    const rs = await user.save();
    return rs;
  }

  async seed() {
    const user = new this.userModel({
      username: 'admin',
      name: 'admin',
      birthday: '1999-01-01',
      active: true,
      email: 'admin@gmail.com',
      password: await EncryptHelper.hash('123456'),
      defaultProject: '',
      allProjects: [],
      userType: UserType.ADMIN,
      inviteID: 'none',
    });

    const rs = await user.save();
    return rs;
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  // Edit user by id
  async edit(id: string, payload: UpdateUserDto) {
    if (!(await this.checkEmailExist(payload.email))) {
      return {
        message: 'Email not found',
      };
    }

    const user = await this.userModel.findByIdAndUpdate(id, payload, { new: true });
    return user;
  }

  // Delete user by id
  async delete(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
  }

  // Get all users
  async getAll() {
    const users = await this.userModel.find();
    return users;
  }

  // Get user by email
  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
