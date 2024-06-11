import express from "express";
import {
  createCourse,
  getCourse,
  getSpecificCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courses.controllers.js";
import { uploadFileUsingMulter } from "../middleswares/multer.middleware.js";

import { verifyUser } from "../middleswares/verifyUser.js";

const router = express.Router();

router.get("/get-courses", getCourse);
router.get("/get-specific-course/:courseId", getSpecificCourse);
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

export default router;
