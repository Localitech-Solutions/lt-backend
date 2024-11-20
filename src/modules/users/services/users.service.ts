import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import { UsersDto } from "../dtos/users.dto";
import { LoginDto } from "../dtos/login.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email }).exec();
    }


    async create(usersDto : UsersDto): Promise<User> {
        return this.userModel.create(usersDto);
    }

    async login(loginDto: LoginDto): Promise<User> {
        return this.userModel.findOne({email: loginDto.email, password: loginDto.password});
    }
}