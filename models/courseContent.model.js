import mongoose from "mongoose";

const courseContentSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
  },
  topic: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  sortBy: {
    type: Number,
    default: 10,
  },
  activate: {
    type: Boolean,
    default: false,
  },
});

const CourseContents = mongoose.model("CourseContents", courseContentSchema);

export { CourseContents };
