import express from "express";
import {
  createList,
  deleteList,
  getMovieByChoice,
} from "../Controller/list.js";
import verify from "../verifyToken.js";

const router = express.Router();

router.post("/", verify, createList);
router.delete("/:id", verify, deleteList);
router.get("/", verify, getMovieByChoice);

export default router;
