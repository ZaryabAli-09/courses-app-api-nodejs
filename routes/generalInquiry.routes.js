import express from "express";
import {
  createGeneralInquiry,
  getGeneralInquiries,
  updateGeneralInquiry,
  deleteGeneralInquiry,
} from "../controllers/generalInquiry.controllers.js";

import { verifyIsAdmin } from "../middleswares/verifyIsAdmin.js";

const router = express.Router();

router.post("/create-generalInquiry", createGeneralInquiry);
router.get("/get-generalInquiries", getGeneralInquiries);

// only admin routes
router.put(
  "/update-generalInquiry/:generalInquiryId",
  verifyIsAdmin,
  updateGeneralInquiry
);
router.delete(
  "/delete-generalInquiry/:generalInquiryId",
  verifyIsAdmin,
  deleteGeneralInquiry
);
export default router;
