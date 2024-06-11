import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default:
        "https://img.lovepik.com/png/20231019/customer-login-avatar-client-gray-head-portrait_269373_wh1200.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
