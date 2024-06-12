import mongoose from "mongoose";
// id:ObjectId, name:string, email:string, inquiry:string, new:boolean:bydefault=true, reply:boolean:bydefault=false, date

const generalInquirySchema = new mongoose.Schema({
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
});

const GeneralInquiries = mongoose.model(
  "GeneralInquiries",
  generalInquirySchema
);

export { GeneralInquiries };
