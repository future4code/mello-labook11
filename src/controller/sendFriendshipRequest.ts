import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { FriendShipBusiness } from "../business/FriendshipBusiness";

export const sendFriendshipRequest = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const userToBefriend = req.body.userToBefriendId;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const userId = authenticationData.id;

    const friendshipBusiness = new FriendShipBusiness();
    friendshipBusiness.sendFriendshipRequest(userId, userToBefriend);

    res.status(200).send({
      message: "Amizade adicionada com sucesso!",
    });
  } catch (error) {
    res.status(400).send({
      message: error.sqlMessage || error.message,
    });
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};
