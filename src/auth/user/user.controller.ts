import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserPresenter } from "./user.presenter";

@Controller("auth/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  get() {
    return this.userService.get();
  }

  @Post()
  async post(@Body() data: CreateUserDto) {
    const user = await this.userService.create(data);
    return new UserPresenter(user).toJson();
  }
}
