import { GeneralInquiries } from "../models/generalInquiry.model.js";

const createGeneralInquiry = async (req, res) => {
  try {
    const { username, email, message, isnew, reply } = req.body;
    if (
      (!username || username === "",
      !email || email === "",
      !message || message === "")
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const savedGeneralInquiry = GeneralInquiries({
      username: trimmedUsername,
      email: trimmedEmail,
      message: trimmedMessage,
      isnew,
      reply,
    });

    await savedGeneralInquiry.save();

    return res.status(200).json({
      savedGeneralInquiry,
      message: "Inquiry successfully sended",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
const getGeneralInquiries = async (req, res) => {
  try {
    const generalInquires = await GeneralInquiries.find();
    const totalInquiries = await GeneralInquiries.countDocuments();

    if (generalInquires.length <= 0) {
      return res.status(404).json({
        message: "No general inquiries",
      });
    }
    res.status(200).json({
      totalInquiries,
      generalInquires,
      message: "Successfully get general inquiries",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

const updateGeneralInquiry = async (req, res) => {
  try {
    const { generalInquiryId } = req.params;

    const updatedGneralInquiry = await GeneralInquiries.findByIdAndUpdate(
      generalInquiryId,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    if (!updateGeneralInquiry) {
      return res.status(400).json({
        message: "Error occur while updating general inquiry please try again",
      });
    }
    return res.status(200).json({
      updateGeneralInquiry,
      message: "General inquiry successfully updated",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
const deleteGeneralInquiry = async (req, res) => {
  try {
    const { generalInquiryId } = req.params;

    if (generalInquiryId) {
      const deletedGeneralInquiry = await GeneralInquiries.findByIdAndDelete(
        generalInquiryId
      );
      if (deleteGeneralInquiry) {
        return res.status(200).json({
          deletedGeneralInquiry,
          message: "General inquiry successfully deleted",
        });
      } else {
        return res.status(400).json({
          message:
            "Error occur while deleting general inquiry please try again",
        });
      }
    }
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
export {
  createGeneralInquiry,
  getGeneralInquiries,
  updateGeneralInquiry,
  deleteGeneralInquiry,
};
