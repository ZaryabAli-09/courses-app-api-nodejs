import express from "express";
import {
  createCourseContent,
  getCourseContents,
  deleteCourseContent,
  updateCourseContent,
} from "../controllers/courseContents.controllers.js";
import { verifyUser } from "../middleswares/verifyUser.js";

const router = express.Router();

// all routes are protected in these restfull apis
router.post("/create-course-contents", verifyUser, createCourseContent);
router.get("/get-course-contents", verifyUser, getCourseContents);
router.put(
  "/update-course-content/:courseContentId",
  verifyUser,
  updateCourseContent
);

router.delete(
  "/delete-course-content/:courseContentId",
  verifyUser,
  deleteCourseContent
);

export default router;
