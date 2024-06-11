import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    sortBy: {
      type: Number,
      required: true,
      unique: true,
      default: 10,
    },
    activate: {
      type: Boolean,
      default: false,
    },
    banner: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export { Category };
