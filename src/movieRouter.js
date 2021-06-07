import express from "express";
import {
  handleHome,
  getUpload,
  postUpload,
  movieDetail,
  deleteMovie,
  getEdit,
  postEdit,
  search,
} from "./movieController";

const movieRouter = express.Router();

// Add your magic here!

movieRouter.get("/", handleHome);
movieRouter.route("/upload").get(getUpload).post(postUpload);
movieRouter.get("/search", search);
movieRouter.get("/movies/:id", movieDetail);
movieRouter.get("/movies/:id/delete", deleteMovie);
movieRouter.route("/movies/:id/edit").get(getEdit).post(postEdit);

export default movieRouter;
