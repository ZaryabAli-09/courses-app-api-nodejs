import mongoose from "mongoose";

const dbConnection = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
  } catch (error) {
    console.log(error, "error occured while connecting to db");
  }
};

export { dbConnection };
