import express from "express";
import { createPost } from "../controller/createPost";
import { typeFeed } from "../controller/typeFeed";

export const postRouter = express.Router();

postRouter.post("/follow", createPost);
postRouter.post("/typefeed", typeFeed);