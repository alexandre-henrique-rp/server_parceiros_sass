import { User } from "@prisma/client";

export class UserPresenter {
  constructor(readonly user: User) {}
  toJson() {
    return {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      username: this.user.username,
      uuid: this.user.uuid,
      emailcontato: this.user.emailcontato,
      whatsapp: this.user.whatsapp,
      cpf: this.user.cpf,
      datanasc: this.user.datanasc,
      cep: this.user.cep,
      endereco: this.user.endereco,
      complemento: this.user.complemento,
      numero: this.user.numero,
      bairro: this.user.bairro,
      uf: this.user.uf,
      municipio: this.user.municipio,
      pixkey: this.user.pixkey,
      roles: this.user.roles,
      avatar: this.user.avatar,
      active: this.user.active,
      createdAt: this.user.createdAt,
      updatedAt: this.user.updatedAt
    };
  }
}
