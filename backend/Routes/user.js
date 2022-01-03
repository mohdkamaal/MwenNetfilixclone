import express from "express";
import {
  DeleteUser,
  getAllUser,
  getState,
  getUser,
  updateUser,
} from "../Controller/user.js";
import User from "../model/user.js";
import verify from "../verifyToken.js";
const router = express.Router();
/** @dev update the password of the user  */
router.put("/:id", verify, updateUser);

/** @dev delete the password of the user  */
router.delete("/:id", verify, DeleteUser);
/** @dev getall user    */
router.get("/", verify, getAllUser);

/** @dev get one user   */
router.get("/find/:id", getUser);

/** @dev get use State   */
router.get("/state", getState);
export default router;
