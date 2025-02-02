import { ApiResponseProperty } from "@nestjs/swagger";
import { UserAuthEntity } from "./userAuth.entity";

export class Auth {
  @ApiResponseProperty({ type: UserAuthEntity })
  user: UserAuthEntity;
  @ApiResponseProperty({ type: String })
  token: string;
}
