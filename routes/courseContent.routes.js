import express from "express";
import {
  createCourseContent,
  //   updateCourseContent,
} from "../controllers/courseContents.controllers.js";

const router = express.Router();

router.post("/create-course-contents", createCourseContent);
// router.put("/update", updateCourseContent);
export default router;
