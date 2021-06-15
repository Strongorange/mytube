import express from "express";
import {
  getJoin,
  getLogin,
  postLogin,
  postJoin,
  logout,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { protectMiddleware, publicOnly } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/logout", protectMiddleware, logout);
rootRouter.route("/join").all(publicOnly).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnly).get(getLogin).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
