import { Request, Response } from "express";
import { Authenticator } from '../services/Authenticator';
import { UserDatabase } from '../data/UserDatabase';

export async function getFriendFeed(req: Request, res: Response){
    try {
        const token = req.headers.authorization as string;
        const authenticator = new Authenticator();
        const userId = authenticator.getData(token).id;
        const getfeed = await new UserDatabase().getFeed(userId)

        if(!token){
            res.status(400).send({message: "É necessário estar logado "})
        } else{
            res.status(200).send(getfeed)
        }
    } catch (error) {
        res.status(400).send({message: error.sqlMessage || error.message})
    }

}