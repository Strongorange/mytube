import express from "express";
import {
  getEdit,
  postEdit,
  see,
  startGithubLogin,
  finishGithubLogin,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { protectMiddleware, publicOnly, uploadFiles } from "../middlewares";

const userRouter = express.Router();

userRouter
  .route("/edit")
  .all(protectMiddleware)
  .get(getEdit)
  .post(uploadFiles.single("avatar"), postEdit);
userRouter.get("/github/start", publicOnly, startGithubLogin);
userRouter.get("/github/finish", publicOnly, finishGithubLogin);
userRouter
  .route("/change-password")
  .all(protectMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/:id", see);

export default userRouter;
