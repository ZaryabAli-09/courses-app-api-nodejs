import { Category } from "../models/category.model.js";

// create / post  category
const createCategory = async (req, res, next) => {
  try {
    let { name, description, sortBy, activate } = req.body;

    if (!name || name === "" || !description || description === "") {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    // trimming the name and description .. removing white places
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    // counting the total documents in category
    // const totalCatgories = await Category.countDocuments();

    // sorting of categories
    const maxSortValue = await Category.findOne()
      .sort({ sortBy: -1 })
      .select("sortBy");

    if (maxSortValue) {
      sortBy = maxSortValue.sortBy + 10;
    } else {
      sortBy = 10;
    }

    const categorySaved = new Category({
      name: trimmedName,
      description: trimmedDescription,
      sortBy,
      activate,
    });

    // saving the body request information in db
    await categorySaved.save();

    res.status(200).json({
      generalCategory: categorySaved,
      message: "New category successfully created.",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

// get specific category
const getSpecificCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({
        message: "error occured when getting category id.",
      });
    }
    const specifcCategory = await Category.findById(categoryId);
    if (!specifcCategory) {
      return res.status(404).json({
        message: "We don't have this category.",
      });
    }
    res.status(200).json({
      specificGeneralCategory: specifcCategory,
      message: "Successfully get specific category",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

// getting all category
const getCategories = async (req, res) => {
  try {
    const allCategories = await Category.find();

    if (!allCategories) {
      return res.status(400).json({
        message: "Error occur while fetching categories",
      });
    }
    res.status(200).json({
      categories: allCategories,
      message: "Successfully get all categories",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, description, sortBy, activate } = req.body;
    const { categoryId } = req.params;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: {
          name,
          description,
          sortBy,
          activate,
        },
      },
      { new: true }
    );

    res.status(200).json({
      updateCategory: updatedCategory,
      message: "Category updated successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export { createCategory, getSpecificCategory, getCategories, updateCategory };
