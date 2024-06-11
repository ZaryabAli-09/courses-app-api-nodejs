import bcryptjs from "bcryptjs";
import { User } from "../models/userAuth.model.js";
import jwt from "jsonwebtoken";

// sign up user functionality
const signUpUser = async (req, res) => {
  try {
    // destructing inputs variables from req.body
    const { username, email, password } = req.body;

    // checking that all fields must be entered
    if (
      !username ||
      username === "" ||
      !email ||
      email === "" ||
      !password ||
      password === ""
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }
    // removing whiteSpaces from all inputs
    const trimmedUserName = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // it will validate the username name that username name should start with an alphabet and some other basic validation
    const userNameRegexValidator = /^[a-zA-Z][a-zA-Z0-9_]{0,19}$/;

    if (!userNameRegexValidator.test(trimmedUserName)) {
      return res.status(400).json({
        message: "Invalid username.",
      });
    }

    // this peice code is for the basic validating for the email
    const emailRegexValidator =
      /^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})$/;
    if (!emailRegexValidator.test(trimmedEmail)) {
      return res.status(400).json({
        message: "Invalid email address.",
      });
    }

    if (trimmedPassword.length < 8) {
      return res.status(400).json({
        message: "Password must be 8 characters.",
      });
    }

    // checking if the email enter by user is already registered or not
    const checkingIfUserAlreadySignedUp = await User.findOne({ trimmedEmail });

    // if email registered
    if (checkingIfUserAlreadySignedUp) {
      return res.status(400).json({
        message: "User already existed.",
      });
    }

    // password encryption before saving it to db
    const hashedPassword = bcryptjs.hashSync(trimmedPassword, 10);

    // making new instance of user and adding info to it
    const signedUser = new User({
      username: trimmedUserName,
      email: trimmedEmail,
      password: hashedPassword,
    });

    // saving info to the database
    await signedUser.save();

    // sending response after all others thing are valid
    return res.status(200).json({
      user: signedUser,
      message: "User registered successfully.",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

// sign in user functionality

const signInUser = async (req, res) => {
  try {
    // taking inputs variables from req.body
    const { email, password } = req.body;

    // check if all required inputs must be entered
    if (!email || email === "" || !password || password === "") {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }
    // removing whitespaces from the inputs

    // checking email entered was valid / registered email or not
    const isEmailValid = await User.findOne({ email });

    // if email is invalid or not registered
    if (!isEmailValid) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    // comparing the password using bcrypt library built in function which will identify for us that the password entered matches the saved password in db pr not
    const isPasswordValid = bcryptjs.compareSync(
      password,
      isEmailValid.password
    );

    // if password is invalid
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }
    // undefined the password before sending logging data to user
    isEmailValid.password = undefined;

    // jwt access_token
    const access_token = jwt.sign(
      { userId: isEmailValid._id, admin: isEmailValid.isAdmin },
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "5d" }
    );

    // sending success respone after all thing are valid
    return res.status(200).cookie("access_token", access_token).json({
      user: isEmailValid,
      message: "User login successfully.",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

// ......................................
// only admin route
// getting all users from the database that are register
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(400).json({
        message: "Error occur while getting users",
      });
    }
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      users: users,
      message: "Successfully get all users",
      totalUsers: totalUsers,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

// only signed in users routes with valid tokens

// delete user account
const deleteUser = async (req, res) => {
  try {
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

    const user = await User.findByIdAndDelete(decodedAccessToken.userId);
    if (!user) {
      return res.status(401).json({
        message: "Invalid Token || Unauthorized",
      });
    }
    return res.status(200).json({
      deletedUser: user,
      message: `${user.username} successfully deleted`,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

const changePasswordOfUser = async (req, res) => {
  try {
    const { password } = req.body;
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be 8 characters",
      });
    }
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
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const user = await User.findByIdAndUpdate(
      decodedAccessToken.userId,
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(401).json({
        message: "Invalid Token || Unauthorized",
      });
    }
    user.password = undefined;
    return res.status(200).json({
      user: user,
      message: "User password successfully change.",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export {
  signUpUser,
  signInUser,
  getAllUsers,
  deleteUser,
  changePasswordOfUser,
};
