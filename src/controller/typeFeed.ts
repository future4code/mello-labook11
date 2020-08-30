import { Request, Response } from "express";
import  { PostsDatabase }  from '../data/PostsDatabase';

export async function typeFeed(req: Request, res: Response) {
    try {
        const token = req.headers.authorization as string;
        const type = req.params.type
        const getFeed = await new PostsDatabase().getTypeFeed(type);

        if(!token){
            throw new Error("É necessário estar logado");
        } else if(!type) {
            throw new Error("É necessário fornecer o tipo de publicação")
        } else {
            res.status(200).send(getFeed)
        }
    } catch (error) {
        res.status(400).send({message: error.sqlMessage || error.message})
    }
}