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
    })
      .then((updatedCourse) => {
        console.log("course updated", updatedCourse);
      })
      .catch((err) => {
        console.log(err);
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

const updateCourseContent = (req, res) => {
  const { courseContent_id, course_id } = req.body;
  const course = Courses.findOneAndUpdate(
    course_id,
    {
      $push: {
        courseContents: courseContent_id,
      },
    },
    { new: true }
  );
  res.send("helllo");
};

export { createCourseContent, updateCourseContent };
