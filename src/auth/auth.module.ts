import { Module } from "@nestjs/common";
import { ControllerController } from "./controller/controller.controller";
import { ServicesService } from "./services/services.service";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";

@Module({
  controllers: [ControllerController, UserController],
  providers: [ServicesService, UserService]
})
export class AuthModule {}
