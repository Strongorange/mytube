import express from "express";
import {
  editProfile,
  seeProfile,
  seeUser,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", seeUser);
userRouter.get("/:id(\\d+)", seeProfile);
userRouter.get("/edit-profile", editProfile);

export default userRouter;
