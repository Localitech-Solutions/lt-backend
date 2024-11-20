import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UsersDto } from '../dtos/users.dto';
import { LoginDto } from '../dtos/login.dto';
import { UsersService } from '../services/users.service';
import { User } from '../schemas/user.schema';

@Controller("user")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('all')
  async getUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Get(':email')
  async getUser(@Param('email') email: string): Promise<User> {
    return await this.usersService.getUserByEmail(email);
  }

  @Post("create")
  @ApiBody({ type: UsersDto })
  async register(@Body() body: UsersDto): Promise<User> {
    return await this.usersService.create(body);
  }

  @Post("login")
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto): Promise<User> {
    return await this.usersService.login(body);
  }
}