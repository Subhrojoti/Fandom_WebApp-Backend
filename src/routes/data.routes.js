import express from "express";
import {
  getDetails,
  getMovies,
  getPopular,
  getTrending,
  getTvSeries,
} from "../controllers/data.controller.js";

const dataRouter = express.Router();

dataRouter.get("/movies", getMovies);
dataRouter.get("/tvseries", getTvSeries);
dataRouter.get("/trending", getTrending);
dataRouter.get("/popular", getPopular);
dataRouter.get("/:id/:mediatype", getDetails);

export default dataRouter;
