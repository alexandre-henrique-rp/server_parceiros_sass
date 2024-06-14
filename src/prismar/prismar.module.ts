import { Global, Module } from "@nestjs/common";
import { PrismarService } from "./prismar.service";

@Global()
@Module({
  providers: [PrismarService],
  exports: [PrismarService]
})
export class PrismarModule {}
