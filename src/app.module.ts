import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismarModule } from "./prismar/prismar.module";

@Module({
  imports: [AuthModule, PrismarModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
