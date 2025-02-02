import { ApiResponseProperty } from "@nestjs/swagger";

export class UserAuthEntity {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  email: string;

  @ApiResponseProperty({ type: String })
  telefone: string;

  @ApiResponseProperty({ type: Boolean })
  whatsapp: boolean;

  @ApiResponseProperty({ type: String })
  telefone2: string;

  @ApiResponseProperty({ type: Boolean })
  whatsapp2: boolean;

  @ApiResponseProperty({ type: String })
  cpf: string;

  @ApiResponseProperty({ type: String })
  datanasc: string;
}
