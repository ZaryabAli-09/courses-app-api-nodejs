import express from "express";
import { signInUser, signUpUser } from "../controllers/userAuth.controllers.js";
import { verifyUser } from "../middleswares/verifyUser.js";
const router = express.Router();

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser, verifyUser);

export default router;
