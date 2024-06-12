import express from "express";
import { dbConnection } from "./db/db.js";
import categoryRouter from "./routes/category.routes.js";
import coursesRouter from "./routes/courses.routes.js";
import userAuthRouter from "./routes/userAuth.route.js";
import generalInquiryRouter from "./routes/generalInquiry.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// initializing enviroment variables configuration
dotenv.config("");

const app = express();

//  for body-parser.. middleware
app.use(express.json());
// for parsing cookies
app.use(cookieParser());

//Set up our main routes
app.use("/api/category", categoryRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/auth", userAuthRouter);
app.use("/api/generalInquiry", generalInquiryRouter);

// if the request passes all the middleware without a response
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// App connection port and mongodb connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is connected on port ${PORT}`);
  dbConnection();
});
