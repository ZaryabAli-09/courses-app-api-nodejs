import { Courses } from "../models/course.model.js";
import { CourseContents } from "../models/courseContent.model.js";

const createCourseContent = async (req, res) => {
  try {
    let { course_id, topic, detail, duration, sortBy, activate } = req.body;
    if (
      !course_id ||
      course_id === "" ||
      !topic ||
      topic === "" ||
      !detail ||
      detail === "" ||
      !duration ||
      duration === ""
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const trimmedTopic = topic.trim();
    const trimDetail = detail.trim();
    // this piece of code will give the maximum sorting value that courses category have
    const maxSortValue = await CourseContents.findOne()
      .sort({ sortBy: -1 })
      .select("sortBy");

    // adding 10 to the maximum sortBy value
    if (maxSortValue) {
      sortBy = maxSortValue.sortBy + 10;
    } else {
      sortBy = 10;
    }

    const savedCourseContents = CourseContents({
      course_id,
      topic: trimmedTopic,
      detail: trimDetail,
      duration,
      sortBy,
      activate,
    });
    await savedCourseContents.save();

    const courseContentId = savedCourseContents._id;

    await Courses.findByIdAndUpdate(course_id, {
      $push: { courseContents: courseContentId },
    }).catch((error) => {
      return res.status(400).json({
        message: error.message,
      });
    });

    res.status(200).json({
      courseContent: savedCourseContents,
      message: "Course content successfully created",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
const getCourseContents = async (req, res) => {
  try {
    const courseContents = await CourseContents.find();
    const totalCourseContents = await CourseContents.countDocuments();

    if (courseContents.length <= 0) {
      return res.status(404).json({
        message: "No course contents",
      });
    }
    res.status(200).json({
      courseContents,
      totalCourseContents,
      message: "Successfully get all course contents",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
const updateCourseContent = async (req, res) => {
  try {
    const { courseContentId } = req.params;
    const updatedCourseContent = await CourseContents.findByIdAndUpdate(
      courseContentId,
      {
        $set: {
          ...req.body,
        },
      }
    );
    res.status(200).json({
      message: "Course content succesfully updated",
      updatedCourseContent,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

const deleteCourseContent = async (req, res) => {
  try {
    const { courseContentId } = req.params;

    const courseContent = await CourseContents.findById(courseContentId);

    if (!courseContent) {
      return res.status(400).json({
        message: "Did'nt find course content",
      });
    }

    const course = await Courses.findById(courseContent.course_id);

    if (!course) {
      return res.status(400).json({
        message: "Did'nt find course",
      });
    }

    const courseContentsIndex = course.courseContents.indexOf(courseContentId);

    if (courseContentsIndex !== -1) {
      course.courseContents.splice(courseContentsIndex, 1);
    }
    await course.save();

    const deletedCourseContent = await CourseContents.findByIdAndDelete(
      courseContentId
    );

    if (!deletedCourseContent) {
      return res.status(400).json({
        message: "Error occur while deleting course content",
      });
    }

    res.status(200).json({
      message: "Course content successfully deleted",
      deletedCourseContent,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export {
  createCourseContent,
  getCourseContents,
  deleteCourseContent,
  updateCourseContent,
};
