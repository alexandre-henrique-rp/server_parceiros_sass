import { ApiResponseProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class UserAuth {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  email: string;

  @ApiResponseProperty({ type: String })
  @Exclude()
  password: string;

  @ApiResponseProperty({ type: String })
  @Exclude()
  senha: string;

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

  @ApiResponseProperty({ type: String })
  cep: string;

  @ApiResponseProperty({ type: String })
  endereco: string;

  @ApiResponseProperty({ type: String })
  cidade: string;

  @ApiResponseProperty({ type: String })
  bairro: string;

  @ApiResponseProperty({ type: String })
  estado: string;

  @ApiResponseProperty({ type: String })
  numero: string;

  @ApiResponseProperty({ type: String })
  complemento: string;

  @ApiResponseProperty({ type: String })
  pixkey: string;

  @ApiResponseProperty({ type: Number })
  voucher: number;

  @ApiResponseProperty({ type: String })
  avatar: string;

  @ApiResponseProperty({ type: Boolean })
  status: boolean;

  @ApiResponseProperty({ type: Object })
  custo: object;

  @ApiResponseProperty({ type: Date })
  created_at: Date;

  @ApiResponseProperty({ type: Date })
  updated_at: Date;

  constructor(partial: Partial<UserAuth>) {
    Object.assign(this, partial);
  }
}
