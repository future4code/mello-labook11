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

    const usersRelationsDatabase = new UsersRelationsDatabase();
    const previousFriendship = await usersRelationsDatabase.getUserRelation(
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

    if (userId === userToBefriend) {
      throw new Error("Não é possível enviar a sim mesmo um pedido de amiade");
    }

    await usersRelationsDatabase.befriendUser(userId, userToBefriend);
  }

  public async removeFriendship(
    userId: string,
    userToUnfriend: string
  ): Promise<void> {
    if (!userId) {
      throw new Error("Não foi possível remover a amizde, insira um id válido");
    }

    if (!userToUnfriend) {
      throw new Error(
        "Não foi possível enviar o pedido de remover amizade, erro ao processar id de usuário da remoção de amizade"
      );
    }

    const usersRelationsDatabase = new UsersRelationsDatabase();
    const previousFriendship = await usersRelationsDatabase.getUserRelation(
      userId,
      userToUnfriend
    );

    if (!previousFriendship) {
      throw new Error("Usuários já não são amigos");
    }

    if (userId === userToUnfriend) {
      throw new Error("Não é possível este pedido a si mesmo");
    }

    await usersRelationsDatabase.removeFriendship(userId, userToUnfriend);
  }
}
