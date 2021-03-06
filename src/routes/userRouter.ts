import express from "express";
import { sendFriendshipRequest } from "../controller/sendFriendshipRequest";
import { signUp } from "../controller/signUp";
import { login } from "../controller/login";
import { removeFriendship } from "../controller/removeFriendship";
import { getFriendFeed } from '../controller/getFriendFeed';

export const userRouter = express.Router();

userRouter.post("/send-friendship-request", sendFriendshipRequest);
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/unfriend", removeFriendship);
userRouter.get('/feed', getFriendFeed);