import express from "express";
import {
  createCourseContent,
  getCourseContents,
  deleteCourseContent,
  updateCourseContent,
} from "../controllers/courseContents.controllers.js";
import { verifyIsAdmin } from "../middleswares/verifyIsAdmin.js";

const router = express.Router();

router.get("/get-course-contents", getCourseContents);
// protected routes
router.post("/create-course-contents", verifyIsAdmin, createCourseContent);
router.put(
  "/update-course-content/:courseContentId",
  verifyIsAdmin,
  updateCourseContent
);

router.delete(
  "/delete-course-content/:courseContentId",
  verifyIsAdmin,
  deleteCourseContent
);

export default router;
