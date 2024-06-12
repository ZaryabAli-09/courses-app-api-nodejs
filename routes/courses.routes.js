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

import { verifyUser } from "../middleswares/verifyUser.js";

const router = express.Router();

router.get("/get-courses", getCourse);
router.get("/get-specific-course/:courseId", getSpecificCourse);
router.get("/get-category-based-course/:categoryId", getCategoryBasedCourses);
//protected routes only admin can access it
router.post(
  "/create-course",
  uploadFileUsingMulter.single("banner"),
  verifyUser,
  createCourse
);
router.put(
  "/update-course/:courseId",
  uploadFileUsingMulter.single("banner"),
  verifyUser,
  updateCourse
);
router.delete("/delete-course/:courseId", verifyUser, deleteCourse);
// router.get("/get-specific-category-course",...........)

export default router;
