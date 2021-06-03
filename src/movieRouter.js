import express from "express";
import { getUpload, home, movieDetail, postUpload } from "./movieController";

const movieRouter = express.Router();

// create the '/' route
movieRouter.get("/", home);
// create the /:id route
movieRouter.get("/:id(\\d+)", movieDetail);
// create the /add route (GET + POST)
movieRouter.route("/add").get(getUpload).post(postUpload);

export default movieRouter;
