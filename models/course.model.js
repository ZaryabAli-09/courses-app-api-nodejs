import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    description: {
      type: String,
      required: true,
    },
    sortBy: {
      type: Number,
      required: true,
      default: 10,
    },
    activate: {
      type: Boolean,
      default: false,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
    preRequisites: {
      type: [String],
    },
    banner: {
      type: String,
      required: true,
    },
    // courseContent:[{
    //  ?
    // }]
  },
  {
    timestamps: true,
  }
);

const Courses = mongoose.model("Courses", courseSchema);

export { Courses };
