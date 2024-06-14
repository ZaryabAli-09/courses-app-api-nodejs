import express from "express";
import {
  signInUser,
  signUpUser,
  getAllUsers,
  deleteUser,
  changePasswordOfUser,
} from "../controllers/userAuth.controllers.js";
import { verifyIsAdmin } from "../middleswares/verifyIsAdmin.js";
import { verifyOnlyUser } from "../middleswares/verifyOnlyUser.js";

const router = express.Router();

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser);

// only admin route
router.get("/get-all-users", verifyIsAdmin, getAllUsers);

// registered users with valid tokens routes
router.delete("/delete-user", verifyOnlyUser, deleteUser);
router.put("/change-password", verifyOnlyUser, changePasswordOfUser);
export default router;
