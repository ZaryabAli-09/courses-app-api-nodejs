import express from "express";
import {
  createCategory,
  getSpecificCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controllers.js";

import { verifyUser } from "../middleswares/verifyUser.js";
import { uploadFileUsingMulter } from "../middleswares/multer.middleware.js";

const router = express.Router();

router.get("/get-categories", getCategories);

// protected routes only amdin can access it
router.get(
  "/get-specific-category/:categoryId",
  verifyUser,
  getSpecificCategory
);
router.post(
  "/create-category",
  uploadFileUsingMulter.single("banner"),
  verifyUser,
  createCategory
);
router.put(
  "/update-category/:categoryId",
  uploadFileUsingMulter.single("banner"),
  verifyUser,
  updateCategory
);

export default router;
