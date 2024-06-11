import express from "express";
import {
  signInUser,
  signUpUser,
  getAllUsers,
  deleteUser,
} from "../controllers/userAuth.controllers.js";
import { verifyUser } from "../middleswares/verifyUser.js";

const router = express.Router();

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser);

router.get("/get-all-users", verifyUser, getAllUsers);
router.delete("/delete-user", deleteUser);

export default router;
