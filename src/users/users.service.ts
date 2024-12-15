import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return createdUser.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username }).lean().exec();
    console.log('Usuario encontrado:', user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
