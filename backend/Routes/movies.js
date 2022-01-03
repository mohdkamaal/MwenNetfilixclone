import express from "express";
import Movie from "../model/movie.js";
import {
  CreateMovies,
  DeleteMovie,
  getallMovie,
  getMovie,
  getRandomMovie,
  UpdataMovie,
} from "../Controller/movies.js";
import verify from "../verifyToken.js";
const router = express.Router();
router.post("/", verify, CreateMovies);
router.get("/find/:id", getMovie);
router.delete("/:id", verify, DeleteMovie);
router.put("/:id", verify, UpdataMovie);
router.get("/random", verify, getRandomMovie);
router.get("/", verify, getallMovie);

export default router;
