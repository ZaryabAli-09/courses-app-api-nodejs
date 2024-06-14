import { SubjectInquiries } from "../models/subjectInquiry.model.js";

const createSubjectInquiry = async (req, res) => {
  try {
    const { course_id, message } = req.body;
    if ((!course_id || course_id === "", !message || message === "")) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const user = req.user;
    const savedSubjectInquiry = SubjectInquiries({
      course_id,
      username: user.username,
      email: user.email,
      message,
    });
    await savedSubjectInquiry.save();

    res.status(200).json({
      message: "Subject inquiry created successfully",
      savedSubjectInquiry,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

const updateSubjectInquiry = async (req, res) => {
  try {
    const { subjectInquiryId } = req.params;

    const updatedSubjectInquiry = await SubjectInquiries.findByIdAndUpdate(
      subjectInquiryId,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    if (!updatedSubjectInquiry) {
      return res.status(400).json({
        message: "Error occur while subject inquiry please try again",
      });
    }
    return res.status(200).json({
      updatedSubjectInquiry,
      message: "Subject inquiry successfully updated",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
const deleteSubjectInquiry = async (req, res) => {
  try {
    const { subjectInquiryId } = req.params;
    const deletedSubjectInquiry = await SubjectInquiries.findByIdAndDelete(
      subjectInquiryId
    );
    if (!deletedSubjectInquiry) {
      return res.status(400).json({
        message: "Error occur while deleting subject inquiry please try again",
      });
    }

    res.status(200).json({
      message: "Subject inquiry successfully deleted",
      deletedSubjectInquiry,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

const getSubjectInquiriesBasedOnCourse = async (req, res) => {
  try {
    const { course_id } = req.params;

    const subjectInquiriesBasedOnCourse = await SubjectInquiries.find({
      course_id,
    });
    if (!subjectInquiriesBasedOnCourse) {
      return res.status(400).json({
        message:
          "Error occur while getting subject inquiries based on course please try again",
      });
    }
    return res.status(200).json({
      message: "Successfully get subject inquiries based on courses",
      subjectInquiriesBasedOnCourse,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
const getSubjectInquiries = async (req, res) => {
  try {
    const subjectInquires = await SubjectInquiries.find();
    const totalInquiries = await SubjectInquiries.countDocuments();

    if (subjectInquires.length <= 0) {
      return res.status(404).json({
        message: "No subject inquiries",
      });
    }
    res.status(200).json({
      totalInquiries,
      subjectInquires,
      message: "Successfully get subject inquiries",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
export {
  createSubjectInquiry,
  updateSubjectInquiry,
  deleteSubjectInquiry,
  getSubjectInquiriesBasedOnCourse,
  getSubjectInquiries,
};
