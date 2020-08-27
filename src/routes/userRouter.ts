import express from "express";
import { sendFriendshipRequest } from "../controller/sendFriendshipRequest";

export const userRouter = express.Router();

userRouter.post("/follow", sendFriendshipRequest);
