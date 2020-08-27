import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { UserDatabase } from "../data/UserDatabase";
import { UsersRelationsDatabase } from "../data/UsersRelationsDatabase";
import { BaseDatabase } from "../data/BaseDatabase";

export class FriendShipBusiness {
  public async sendFriendshipRequest(
    userId: string,
    userToBefriend: string
  ): Promise<void> {
    if (!userId) {
      throw new Error(
        "Não foi possível enviar o pedido de amizade, insira um id válido"
      );
    }

    if (!userToBefriend) {
      throw new Error(
        "Não foi possível enviar o pedido de amizade, erro ao processar id de usuário do pedido de amizade"
      );
    }

    // Validação se já não existe relação de amizade entre os dois usuários
    const usersRelationsDatabase = new UsersRelationsDatabase();
    const previousFriendship = usersRelationsDatabase.getUserRelation(
      userId,
      userToBefriend
    );

    if (previousFriendship) {
      throw new Error("Usuários já são amigos");
    }

    const userDatabase = new UserDatabase();
    const user = userDatabase.getUserById(userToBefriend);

    if (!user) {
      throw new Error(
        "Não foi possível enviar o pedido de amizade, usuário não encontrado"
      );
    }

    await usersRelationsDatabase.befriendUser(userId, userToBefriend);
  }
}
