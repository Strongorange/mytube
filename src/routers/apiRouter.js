import express from "express";
import {
  createComment,
  registerView,
  removeComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
apiRouter.delete("/deletecomment/:id([0-9a-f]{24})", removeComment);

export default apiRouter;
