import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { NewPasswordAuthDto } from "./dto/new-password-auth.dto";
import { ApiResponse } from "@nestjs/swagger";
import { Auth } from "./entities/auth.entity";
import { ErrorEntity } from "../entities/error.entity";
import { UserAuth } from "./entities/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiResponse({ status: 200, description: "login", type: Auth })
  @ApiResponse({ status: 400, description: "Bad Request", type: ErrorEntity })
  /**
   * Handles the request to log in a user.
   * @param data - The data required to log in, including email and password.
   * @returns A promise resolving to a UserAuth object on success, or an
   * ErrorEntity object on failure.
   */
  login(@Body() data: LoginAuthDto) {
    return this.authService.login(data);
  }

  @Post("/cadastro")
  @ApiResponse({ status: 200, description: "cadastro", type: UserAuth })
  @ApiResponse({ status: 400, description: "Bad Request", type: ErrorEntity })
  /**
   * Handles the request to create a new user.
   * @param createAuthDto - The data required to create a new user, including name, email, password, and phone number.
   * @returns The created user.
   * @throws {HttpException} If there is an error creating the user.
   */
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post("/reset-password")
  @ApiResponse({ status: 200, description: "reset-password", type: UserAuth })
  @ApiResponse({ status: 400, description: "Bad Request", type: ErrorEntity })
  /**
   * Handles the request to reset a user's password.
   * @param data - The data required to reset the password, including email,
   * password, and confirmation of the password.
   * @returns A promise resolving to a UserAuth object on success, or an
   * ErrorEntity object on failure.
   */
  newPassword(@Body() data: NewPasswordAuthDto) {
    return this.authService.newPassword(data);
  }
}
