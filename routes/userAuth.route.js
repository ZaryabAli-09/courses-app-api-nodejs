import express from "express";
import {
  signInUser,
  signUpUser,
  getAllUsers,
  deleteUser,
  changePasswordOfUser,
} from "../controllers/userAuth.controllers.js";
import { verifyUser } from "../middleswares/verifyUser.js";

const router = express.Router();

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser);

router.get("/get-all-users", verifyUser, getAllUsers);

router.delete("/delete-user", deleteUser);
router.put("/change-password", changePasswordOfUser);
export default router;
