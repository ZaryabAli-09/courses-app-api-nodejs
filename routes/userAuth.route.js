import express from "express";
import { signInUser, signUpUser } from "../controllers/userAuth.controllers.js";

const router = express.Router();

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser);

export default router;
