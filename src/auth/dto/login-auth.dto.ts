import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
  @ApiProperty({
    description: "Email do usuário",
    type: String,
    example: "ZV8rG@example.com",
    required: true
  })
  @IsString({ message: "Email inválido" })
  @IsNotEmpty({ message: "Email é obrigatório" })
  readonly email: string;

  @ApiProperty({
    description: "Senha do usuário",
    type: String,
    example: "123456",
    required: true
  })
  @IsString({ message: "Senha inválida" })
  @IsNotEmpty({ message: "Senha é obrigatória" })
  readonly password: string;
}
