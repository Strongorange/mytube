import express from "express";
import {
  getEdit,
  postEdit,
  see,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";
import { protectMiddleware, publicOnly } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/edit").all(protectMiddleware).get(getEdit).post(postEdit);
userRouter.get("/github/start", publicOnly, startGithubLogin);
userRouter.get("/github/finish", publicOnly, finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;
