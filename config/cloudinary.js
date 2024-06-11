import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: "dzlspqxhz",
  api_key: "647898266286867",
  api_secret: "4E0BnMphUNpyoL0rXnwPp2I_C-k",
});

const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return console.log("could not find path of file");
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file uploaded ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath);
  }
};

export { uploadToCloudinary };
