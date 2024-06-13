import mongoose from "mongoose";

const subjectInquirySchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
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

const SubjectInquiries = mongoose.model(
  "SubjectInquiries",
  subjectInquirySchema
);

export { SubjectInquiries };
