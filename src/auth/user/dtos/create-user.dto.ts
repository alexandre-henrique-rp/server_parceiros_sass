/**
 * DTO para criação de usuários
 * @see CreateUserDto
 * @string Username - Nome de usuário -
 * @string Name - Nome completo
 * @string email - Email de contato
 */
export class CreateUserDto {
  username: string;
  name: string;
  email: string;
  password: string;
}
