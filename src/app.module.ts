import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismarModule } from "./prismar/prismar.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [AuthModule, PrismarModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
