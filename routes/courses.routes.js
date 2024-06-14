import express from "express";
import {
  createCourse,
  getCourse,
  getSpecificCourse,
  getCategoryBasedCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/courses.controllers.js";
import { uploadFileUsingMulter } from "../middleswares/multer.middleware.js";

import { verifyIsAdmin } from "../middleswares/verifyIsAdmin.js";

const router = express.Router();

router.get("/get-courses", getCourse);

router.get("/get-specific-course/:courseId", getSpecificCourse);
router.get("/get-category-based-course/:categoryId", getCategoryBasedCourses);
//protected routes only admin can access it
router.post(
  "/create-course",
  uploadFileUsingMulter.single("banner"),
  verifyIsAdmin,
  createCourse
);
router.put(
  "/update-course/:courseId",
  uploadFileUsingMulter.single("banner"),
  verifyIsAdmin,
  updateCourse
);
router.delete("/delete-course/:courseId", verifyIsAdmin, deleteCourse);

export default router;
