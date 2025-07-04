const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { errorResponse, successResponse } = require("../utils/reponse");

exports.Register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return errorResponse(res, "User already exists", {}, 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    const savedUser = await newUser.save();
    const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);
    const userData = savedUser.toObject();
    delete userData.password;
    return successResponse(
      res,
      `${capitalizedRole} registered successfully`,
      userData,
      201
    );
  } catch (err) {
    return errorResponse(res, err.mgs ?? "Something went worng", {});
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, "User not found..!", {}, 404);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res, "Invaild credentials", {}, 401);

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return successResponse(res, `Login successfully`, { token });
  } catch (err) {
    return errorResponse(res, err.message, {});
  }
};
