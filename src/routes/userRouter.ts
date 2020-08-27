import express from "express";
import { sendFriendshipRequest } from "../controller/sendFriendshipRequest";
import { signUp } from "../controller/signUp";
import { login } from "../controller/login";

export const userRouter = express.Router();

userRouter.post("/follow", sendFriendshipRequest);
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
