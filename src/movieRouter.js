import express from "express";
import {
  handleHome,
  getUpload,
  postUpload,
  movieDetail,
  deleteMovie,
  getEdit,
  putEdit,
} from "./movieController";

const movieRouter = express.Router();

// Add your magic here!

movieRouter.get("/", handleHome);
movieRouter.route("/upload").get(getUpload).post(postUpload);
movieRouter.get("/movies/:id", movieDetail);
movieRouter.get("/movies/:id/delete", deleteMovie);
movieRouter.route("/movies/:id/edit").get(getEdit).put(putEdit);

export default movieRouter;
