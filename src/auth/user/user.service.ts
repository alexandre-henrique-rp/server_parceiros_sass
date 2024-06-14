import { Injectable } from "@nestjs/common";
import { PrismarService } from "src/prismar/prismar.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { v4 as uuid } from "uuid";
import { UserRoles } from "./user-roles";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private prismarService: PrismarService) {}
  async get() {
    return "rota criada usuario";
  }

  /**
   * Creates a new user using the provided data.
   *@method POST
   * @param {CreateUserDto} data - The data for creating the user.
   * @return {Promise<any>} - A promise that resolves to the created user.
   */
  async create(data: CreateUserDto): Promise<any> {
    return this.prismarService.user.create({
      data: {
        name: data.name,
        username: data.username,
        password: await this.generateHash(data.password),
        email: data.email,
        emailcontato: data.email,
        uuid: uuid(),
        roles: [UserRoles.PARTNER]
      }
    });
  }
  generateHash(password: string) {
    return bcrypt.hash(password, 10);
  }
}
