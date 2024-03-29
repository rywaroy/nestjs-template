import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const salt = await bcrypt.genSalt(10);
        const data = {
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, salt),
        };
        return this.userModel.create(data);
    }

    findAll() {
        return this.userModel.find().exec();
    }

    findOne(id: string): Promise<UserDocument> {
        return this.userModel.findById(id).select('-password').exec();
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserDto);
    }

    remove(id: string) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
