import express from "express";
import {
  createSubjectInquiry,
  updateSubjectInquiry,
  deleteSubjectInquiry,
  getSubjectInquiriesBasedOnCourse,
  getSubjectInquiries,
} from "../controllers/subjectInquiry.controllers.js";
import { verifyOnlyUser } from "../middleswares/verifyOnlyUser.js";
import { verifyUser } from "../middleswares/verifyUser.js";
const router = express.Router();

router.post("/create-subject-inquiry", verifyOnlyUser, createSubjectInquiry);
// admin routes
router.put(
  "/update-subject-inquiry/:subjectInquiryId",
  verifyUser,
  updateSubjectInquiry
);
router.delete(
  "/delete-subject-inquiry/:subjectInquiryId",
  verifyUser,
  deleteSubjectInquiry
);

router.get("/get-subject-inquiries", verifyUser, getSubjectInquiries);
router.get(
  "/get-subject-inquiries-based-oncourses/:course_id",
  verifyUser,
  getSubjectInquiriesBasedOnCourse
);

export default router;
