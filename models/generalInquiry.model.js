import mongoose from "mongoose";

const generalInquirySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isnew: {
      type: Boolean,
      default: true,
    },
    reply: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const GeneralInquiries = mongoose.model(
  "GeneralInquiries",
  generalInquirySchema
);

export { GeneralInquiries };
