import { User } from "../models/userAuth.model.js";
import jwt from "jsonwebtoken";
const verifyOnlyUser = async (req, res, next) => {
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

  if (!decodedAccessToken) {
    return res.status(401).json({
      message: "Invalid access || Unauthorized",
    });
  }

  const user = await User.findById(decodedAccessToken.userId);
  if (!user) {
    return res.status(401).json({
      message: "Invalid Token || Unauthorized",
    });
  }

  console.log("valid access");
  req.user = user;
  next();
};
export { verifyOnlyUser };
