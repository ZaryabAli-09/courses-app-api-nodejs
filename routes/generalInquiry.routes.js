import express from "express";
import {
  createGeneralInquiry,
  getGeneralInquiries,
  updateGeneralInquiry,
  deleteGeneralInquiry,
} from "../controllers/generalInquiry.controllers.js";

import { verifyUser } from "../middleswares/verifyUser.js";

const router = express.Router();

router.post("/create-generalInquiry", createGeneralInquiry);
router.get("/get-generalInquiries", getGeneralInquiries);

// only admin routes
router.put(
  "/update-generalInquiry/:generalInquiryId",
  verifyUser,
  updateGeneralInquiry
);
router.delete(
  "/delete-generalInquiry/:generalInquiryId",
  verifyUser,
  deleteGeneralInquiry
);
export default router;
