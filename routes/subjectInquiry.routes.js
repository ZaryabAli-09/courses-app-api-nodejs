import express from "express";
import {
  createSubjectInquiry,
  updateSubjectInquiry,
  deleteSubjectInquiry,
  getSubjectInquiriesBasedOnCourse,
  getSubjectInquiries,
} from "../controllers/subjectInquiry.controllers.js";
import { verifyOnlyUser } from "../middleswares/verifyOnlyUser.js";
import { verifyIsAdmin } from "../middleswares/verifyIsAdmin.js";
const router = express.Router();

router.post("/create-subject-inquiry", verifyOnlyUser, createSubjectInquiry);
// admin routes
router.put(
  "/update-subject-inquiry/:subjectInquiryId",
  verifyIsAdmin,
  updateSubjectInquiry
);
router.delete(
  "/delete-subject-inquiry/:subjectInquiryId",
  verifyIsAdmin,
  deleteSubjectInquiry
);

router.get("/get-subject-inquiries", verifyIsAdmin, getSubjectInquiries);
router.get(
  "/get-subject-inquiries-based-oncourses/:course_id",
  verifyIsAdmin,
  getSubjectInquiriesBasedOnCourse
);

export default router;
