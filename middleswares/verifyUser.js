import jwt from "jsonwebtoken";
import { User } from "../models/userAuth.model.js";

const verifyUser = async (req, res, next) => {
  const userBrowserAccessToken = req.cookies.access_token;
  if (!userBrowserAccessToken) {
    return res.status(401).json({
      message: "Unauthorized access! token not present",
    });
  }

  const decodedAccessToken = jwt.verify(
    userBrowserAccessToken,
    process.env.JWT_ACCESS_TOKEN_SECRET_KEY
  );

  if (!decodedAccessToken.admin || !decodedAccessToken) {
    return res.status(401).json({
      message: "Invalid access | only admin can access theses routes",
    });
  }

  const user = await User.findById(decodedAccessToken.userId);
  if (!user) {
    return res.status(401).json({
      message: "Invalid Token || Unauthorized",
    });
  }

  console.log("valid access");
  next();
};

export { verifyUser };
