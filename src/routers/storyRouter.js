import express from "express";
import {
  deleteStory,
  editStory,
  seeStory,
} from "../controllers/storyController";

const storiesRouter = express.Router();

storiesRouter.get("/:id(\\d+)", seeStory);
storiesRouter.get("/:id(\\d+)/edit", editStory);
storiesRouter.get("/:id(\\d+)/delete", deleteStory);

export default storiesRouter;
