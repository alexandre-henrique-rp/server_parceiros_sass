import { HttpException, Injectable } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { NewPasswordAuthDto } from "./dto/new-password-auth.dto";
import { PrismarService } from "../prismar/prismar.service";
import { UserAuth } from "./entities/user.entity";
import { ErrorEntity } from "../entities/error.entity";
import { plainToClass } from "class-transformer";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Auth } from "./entities/auth.entity";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismarService,
    private jwtService: JwtService
  ) {}

  /**
   * Create a new user in the database.
   * @param dados The user data.
   * @returns The created user.
   * @throws {HttpException} If there is an error creating the user.
   */
  async create(dados: CreateAuthDto): Promise<UserAuth | ErrorEntity> {
    try {
      const create = await this.prisma.user.create({
        data: {
          ...dados,
          password: bcrypt.hashSync(dados.password, 10),
          senha: dados.password
        }
      });
      const userAuth = plainToClass(UserAuth, create);

      return userAuth;
    } catch (error) {
      const retorno = {
        message: error.message || error || "Erro ao criar usuário",
        status: error.status || 500
      };
      throw new HttpException(retorno, 400);
    }
  }

  /**
   * Authenticates a user and generates a JWT token.
   * @param data - The login credentials containing email and password.
   * @returns An Auth object containing the user details and a JWT token,
   * or an ErrorEntity if authentication fails.
   * @throws {HttpException} If the user is not found, the credentials are incorrect,
   * or the user is inactive.
   */

  async login(data: LoginAuthDto): Promise<Auth | ErrorEntity> {
    try {
      const UsuarioExist = await this.GetUser(data.email);

      if (!UsuarioExist) {
        throw new Error("Usuário não encontrado");
      }
      const isValid = bcrypt.compareSync(data.password, UsuarioExist.password);

      if (!isValid) {
        throw new Error("Usuário e senha incorretos");
      }
      if (!UsuarioExist.status) {
        throw new Error("Usuário inativo");
      }

      const Payload = {
        id: UsuarioExist.id,
        name: UsuarioExist.name,
        email: UsuarioExist.email,
        cpf: UsuarioExist.cpf
      };
      const retorno: Auth = {
        user: {
          id: UsuarioExist.id,
          name: UsuarioExist.name,
          email: UsuarioExist.email,
          telefone: UsuarioExist.telefone,
          whatsapp: UsuarioExist.whatsapp,
          telefone2: UsuarioExist.telefone2,
          whatsapp2: UsuarioExist.whatsapp2,
          cpf: UsuarioExist.cpf,
          datanasc: UsuarioExist.datanasc
        },
        token: this.jwtService.sign(Payload)
      };
      return retorno;
    } catch (error) {
      const retorno = {
        message: error.message || error || "Erro ao fazer login",
        status: error.status || 500
      };
      throw new HttpException(retorno, 400);
    }
  }

  async newPassword(data: NewPasswordAuthDto): Promise<UserAuth | ErrorEntity> {
    try {
      const UsuarioExist = await this.GetUser(data.email);

      if (!UsuarioExist) {
        throw new Error("Usuário não encontrado");
      }
      if (data.password !== data.confirmPassword) {
        throw new Error("As senhas não conferem");
      }

      const retorno = await this.prisma.user.update({
        where: {
          id: UsuarioExist.id
        },
        data: {
          password: bcrypt.hashSync(data.password, 10),
          senha: data.password
        }
      });
      return plainToClass(UserAuth, retorno);
    } catch (error) {
      const retorno = {
        message: error.message || error || "Erro ao fazer login",
        status: error.status || 500
      };
      throw new HttpException(retorno, 400);
    }
  }

  //____________________________________________________________________________________

  async GetUser(email: string) {
    try {
      const UsuarioExist = await this.prisma.user.findFirst({
        where: {
          email: email
        }
      });

      if (!UsuarioExist) {
        return null;
      }
      return UsuarioExist;
    } catch (error) {
      return null;
    }
  }
}
