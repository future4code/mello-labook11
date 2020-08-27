import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { PostsBusiness } from "../business/PostsBusiness";

export const createPost = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    
    const photo_url = req.body.photo_url;
    const description = req.body.description;
    const creationDate = req.body.creation_date;
    const type = req.body.type;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);
    const creator_id = authenticationData.id;

    const postsBusiness = new PostsBusiness();
    await postsBusiness.createPost(
      photo_url,
      description,
      creationDate,
      type,
      creator_id
    );

    res.status(200).send({
      message: "Post adicionado com sucesso!",
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
