import express from "express";
import {
  createCategory,
  getSpecificCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controllers.js";

import { verifyIsAdmin } from "../middleswares/verifyIsAdmin.js";
import { uploadFileUsingMulter } from "../middleswares/multer.middleware.js";

const router = express.Router();

router.get("/get-categories", getCategories);

// protected routes only amdin can access it
router.get(
  "/get-specific-category/:categoryId",
  verifyIsAdmin,
  getSpecificCategory
);
router.post(
  "/create-category",
  uploadFileUsingMulter.single("banner"),
  verifyIsAdmin,
  createCategory
);
router.put(
  "/update-category/:categoryId",
  uploadFileUsingMulter.single("banner"),
  verifyIsAdmin,
  updateCategory
);

export default router;
