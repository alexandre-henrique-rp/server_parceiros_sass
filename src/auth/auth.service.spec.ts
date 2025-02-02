import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { PrismarService } from "../prismar/prismar.service";
import { JwtService } from "@nestjs/jwt";
import { HttpException } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import * as bcrypt from "bcrypt";
import { UserAuth } from "./entities/user.entity";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { plainToClass } from "class-transformer";
import { NewPasswordAuthDto } from "./dto/new-password-auth.dto";

const mockUser: UserAuth = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  password: "hashedPassword",
  status: true,
  senha: "senha",
  telefone: "999999999",
  whatsapp: false,
  telefone2: "999999999",
  whatsapp2: false,
  cpf: "999999999",
  datanasc: "2020-01-01",
  cep: "99999999",
  endereco: "Rua Exemplo",
  cidade: "cidade",
  bairro: "Bairro",
  estado: "state",
  numero: "123",
  complemento: "complemento",
  pixkey: "23456789",
  voucher: 0,
  avatar:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
  custo: undefined,
  created_at: undefined,
  updated_at: undefined
};

const createAuthDto: CreateAuthDto = {
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  telefone: "1234567890",
  telefone2: "1234567890",
  cpf: "1234567890",
  datanasc: "2020-01-01",
  cep: "234567890",
  endereco: "rua exemplo",
  cidade: "cidade",
  bairro: "Bairro",
  estado: "state",
  numero: "123",
  complemento: "",
  pixkey: "211234567890",
  custo: []
};

describe("AuthService", () => {
  let service: AuthService;
  let prismaService: PrismarService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismarService,
          useValue: {
            user: {
              create: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn()
            }
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismarService>(PrismarService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe("create", () => {
    it("should create a new user and exclude password and senha from the response", async () => {
      jest.spyOn(prismaService.user, "create").mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, "hashSync").mockReturnValue("hashedPassword");

      const result = await service.create(createAuthDto);

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...createAuthDto,
          password: "hashedPassword",
          senha: "password123"
        }
      });
      expect(result).toEqual({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        avatar:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
        bairro: "Bairro",
        cep: "99999999",
        cidade: "cidade",
        complemento: "complemento",
        cpf: "999999999",
        created_at: undefined,
        custo: undefined,
        datanasc: "2020-01-01",
        endereco: "Rua Exemplo",
        estado: "state",
        numero: "123",
        pixkey: "23456789",
        status: true,
        telefone: "999999999",
        telefone2: "999999999",
        updated_at: undefined,
        voucher: 0,
        whatsapp: false,
        whatsapp2: false
      });
    });

    it("should throw an HttpException if there is an error", async () => {
      jest
        .spyOn(prismaService.user, "create")
        .mockRejectedValue(new Error("Database error"));

      await expect(service.create(createAuthDto)).rejects.toThrow(
        HttpException
      );
    });
  });

  describe("login", () => {
    it("should return a user and a token if credentials are valid", async () => {
      const loginAuthDto: LoginAuthDto = {
        email: "john@example.com",
        password: "password123"
      };

      jest.spyOn(service, "GetUser").mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, "compareSync").mockReturnValue(true);
      jest.spyOn(jwtService, "sign").mockReturnValue("mockToken");

      const result = await service.login(loginAuthDto);

      expect(service.GetUser).toHaveBeenCalledWith("john@example.com");
      expect(bcrypt.compareSync).toHaveBeenCalledWith(
        "password123",
        "hashedPassword"
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        cpf: mockUser.cpf
      });
      expect(result).toEqual({
        user: {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          telefone: mockUser.telefone,
          whatsapp: mockUser.whatsapp,
          telefone2: mockUser.telefone2,
          whatsapp2: mockUser.whatsapp2,
          cpf: mockUser.cpf,
          datanasc: mockUser.datanasc
        },
        token: "mockToken"
      });
    });

    it("should throw an HttpException if user is not found", async () => {
      const loginAuthDto: LoginAuthDto = {
        email: "john@example.com",
        password: "password123"
      };

      jest.spyOn(service, "GetUser").mockResolvedValue(null);

      await expect(service.login(loginAuthDto)).rejects.toThrow(HttpException);
    });

    it("should throw an HttpException if password is incorrect", async () => {
      const loginAuthDto: LoginAuthDto = {
        email: "john@example.com",
        password: "password123"
      };

      jest.spyOn(service, "GetUser").mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, "compareSync").mockReturnValue(false);

      await expect(service.login(loginAuthDto)).rejects.toThrow(HttpException);
    });

    it("should throw an HttpException if user is inactive", async () => {
      const loginAuthDto: LoginAuthDto = {
        email: "john@example.com",
        password: "password123"
      };

      jest.spyOn(service, "GetUser").mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, "compareSync").mockReturnValue(true);

      await expect(service.login(loginAuthDto)).rejects.toThrow(HttpException);
    });
  });

  describe("newPassword", () => {
    it("should update the user password and return the user", async () => {
      const newPasswordAuthDto: NewPasswordAuthDto = {
        email: "john@example.com",
        password: "newPassword123",
        confirmPassword: "newPassword123"
      };

      const updatedUser = {
        ...mockUser,
        password: "newHashedPassword",
        senha: "newPassword123"
      };

      jest.spyOn(service, "GetUser").mockResolvedValue(mockUser);
      jest.spyOn(prismaService.user, "update").mockResolvedValue(updatedUser);
      jest.spyOn(bcrypt, "hashSync").mockReturnValue("newHashedPassword");

      const result = await service.newPassword(newPasswordAuthDto);

      expect(service.GetUser).toHaveBeenCalledWith("john@example.com");
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          password: "newHashedPassword",
          senha: "newPassword123"
        }
      });
      expect(result).toEqual(plainToClass(UserAuth, updatedUser));
    });

    it("should throw an HttpException if user is not found", async () => {
      const newPasswordAuthDto: NewPasswordAuthDto = {
        email: "john@example.com",
        password: "newPassword123",
        confirmPassword: "newPassword123"
      };

      jest.spyOn(service, "GetUser").mockResolvedValue(null);

      await expect(service.newPassword(newPasswordAuthDto)).rejects.toThrow(
        HttpException
      );
    });

    it("should throw an HttpException if passwords do not match", async () => {
      const newPasswordAuthDto: NewPasswordAuthDto = {
        email: "john@example.com",
        password: "newPassword123",
        confirmPassword: "differentPassword"
      };

      jest.spyOn(service, "GetUser").mockResolvedValue(mockUser);

      await expect(service.newPassword(newPasswordAuthDto)).rejects.toThrow(
        HttpException
      );
    });
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
