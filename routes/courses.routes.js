import express from "express";
import {
  createCourse,
  getCourse,
  getSpecificCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courses.controllers.js";

import { verifyUser } from "../middleswares/verifyUser.js";

const router = express.Router();

router.post("/create-course", createCourse);
router.get("/get-courses", verifyUser, getCourse);
router.get("/get-specific-course/:courseId", getSpecificCourse);
router.put("/update-course/:courseId", updateCourse);
router.delete("/delete-course/:courseId", deleteCourse);

export default router;
