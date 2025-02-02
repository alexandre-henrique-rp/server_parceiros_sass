import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class CreateAuthDto {
  @ApiProperty({
    description: "Nome do usuário",
    type: String,
    example: "John Doe",
    required: true
  })
  @IsString({ message: "O Nome deve ser uma string" })
  @IsNotEmpty({ message: "O Nome é obrigatório" })
  readonly name: string;

  @ApiProperty({
    description: "Email do usuário",
    type: String,
    example: "ZV8rG@example.com",
    required: true
  })
  @IsString({ message: "O Email deve ser uma string" })
  @IsNotEmpty({ message: "O Email é obrigatório" })
  readonly email: string;

  @ApiProperty({
    description: "Senha do usuário",
    type: String,
    example: "123456",
    required: true
  })
  @IsString({ message: "A Senha deve ser uma string" })
  @IsNotEmpty({ message: "A Senha é obrigatória" })
  readonly password: string;

  @ApiProperty({
    description: "Telefone do usuário",
    type: String,
    example: "(00) 0000-0000",
    required: false
  })
  @IsOptional()
  @IsString({ message: "O Telefone deve ser uma string" })
  @Transform(({ value }) => value.replace(/\D/g, ""))
  readonly telefone: string;

  @ApiProperty({
    description: "Telefone 2 do usuário",
    type: String,
    example: "(00) 0000-0000",
    required: false
  })
  @IsOptional()
  @IsString({ message: "O Telefone 2 deve ser uma string" })
  @Transform(({ value }) => value.replace(/\D/g, ""))
  readonly telefone2: string;

  @ApiProperty({
    description: "CPF do usuário",
    type: String,
    example: "000.000.000-00",
    required: true
  })
  @IsString({ message: "O CPF deve ser uma string" })
  @IsNotEmpty({ message: "O CPF é obrigatório" })
  @Transform(({ value }) => value.replace(/\D/g, ""))
  readonly cpf: string;

  @ApiProperty({
    description: "Data de Nascimento do usuário",
    type: String,
    example: "2000-01-01",
    required: true
  })
  @IsString({ message: "A Data de Nascimento deve ser uma string" })
  @IsNotEmpty({ message: "A Data de Nascimento é obrigatória" })
  readonly datanasc: string;

  @ApiProperty({
    description: "CEP do usuário",
    type: String,
    example: "00000-000",
    required: false
  })
  @IsOptional()
  @IsString({ message: "O CEP deve ser uma string" })
  @Transform(({ value }) => value.replace(/\D/g, ""))
  readonly cep: string;

  @ApiProperty({
    description: "Endereço do usuário",
    type: String,
    example: "Rua A, 123",
    required: false
  })
  @IsOptional()
  @IsString({ message: "O Endereço deve ser uma string" })
  readonly endereco: string;

  @ApiProperty({
    description: "Cidade do usuário",
    type: String,
    example: "Cidade A",
    required: false
  })
  @IsOptional()
  @IsString({ message: "A Cidade deve ser uma string" })
  readonly cidade: string;

  @ApiProperty({
    description: "Bairro do usuário",
    type: String,
    example: "Bairro A",
    required: false
  })
  @IsOptional()
  @IsString({ message: "O Bairro deve ser uma string" })
  readonly bairro: string;

  @ApiProperty({
    description: "Estado do usuário",
    type: String,
    example: "Estado A",
    required: false
  })
  @IsOptional()
  @IsString({ message: "O Estado deve ser uma string" })
  readonly estado: string;

  @ApiProperty({
    description: "Número do usuário",
    type: String,
    example: "123",
    required: false
  })
  @IsOptional()
  @IsString({ message: "O Número deve ser uma string" })
  readonly numero: string;

  @ApiProperty({
    description: "Complemento do usuário",
    type: String,
    example: "Complemento A",
    required: false
  })
  @IsOptional()
  @IsString({ message: "O Complemento deve ser uma string" })
  readonly complemento: string;

  @ApiProperty({
    description: "Chave Pix do usuário",
    type: String,
    example: "Chave Pix A",
    required: false
  })
  @IsOptional()
  @IsString({ message: "A Chave Pix deve ser uma string" })
  readonly pixkey: string;

  @ApiProperty({
    description: "Custo do usuário",
    type: Array,
    example: [{ A1pj: 1, A2pj: 2 }],
    required: false
  })
  @IsOptional()
  @IsObject({ message: "O Custo deve ser um objeto" })
  readonly custo: object[];
}
