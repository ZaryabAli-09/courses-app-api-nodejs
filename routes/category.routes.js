import express from "express";
import {
  createCategory,
  getSpecificCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controllers.js";

const router = express.Router();

router.post("/create-category", createCategory);
router.get("/get-specific-category/:categoryId", getSpecificCategory);
router.get("/get-categories", getCategories);
router.put("/update-category/:categoryId", updateCategory);

export default router;
