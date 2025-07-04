const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { errorResponse } = require("../utils/reponse");

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({
      role: "employee",
      deleteStatus: false,
    }).select("-password -deleteStatus");
    return successResponse(res, "Employees fetched successfully", employees);
  } catch (err) {
    return errorResponse(res, err.message ?? "Internal Server error", {});
  }
};

// Add employee
const addEmployee = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return errorResponse(
        res,
        "All required fields must be filled out",
        {},
        400
      );
    }
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return errorResponse(res, "Employee Already Taken", {}, 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return successResponse(res, `Empolyee created successfully`, {}, 201);
  } catch (err) {
    return errorResponse(res, err.message ?? "Internal Server error", {});
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {
  try {
    const { email } = req.body;

    const existsUser = await User.findOne({ email });

    if (!existsUser) {
      return errorResponse(res, "Employee does not exist", {}, 400);
    }
    existsUser.deleteStatus = true;
    await existsUser.save();
    return successResponse(res, `Employee deleted successfully`);
  } catch (err) {
    return errorResponse(res, err.message ?? "Internal Server error", {});
  }
};

// Get all managers
const getManagers = async (req, res) => {
  try {
    const managers = await User.find({
      role: "manager",
      deleteStatus: false,
    }).select("-password -deleteStatus");
    return successResponse(res, "Managers fetched successfully", managers);
  } catch (err) {
    return errorResponse(res, err.message ?? "Internal Server error", {});
  }
};

// Add manager
const addManager = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return errorResponse(
        res,
        "All required fields must be filled out",
        {},
        400
      );
    }
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return errorResponse(res, "Manager Already Taken", {}, 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return successResponse(res, `Manager created successfully`, {}, 201);
  } catch (err) {
    return errorResponse(res, err.message ?? "Internal Server error", {});
  }
};

// Delete manager
const deleteManager = async (req, res) => {
  try {
    const { email } = req.body;

    const existsUser = await User.findOne({ email });

    if (!existsUser) {
      return errorResponse(res, "Manager does not exist", {}, 400);
    }

    existsUser.deleteStatus = true;
    await existsUser.save();
    return successResponse(res, `Manager deleted successfully`);
  } catch (err) {
    return errorResponse(res, err.message ?? "Internal Server error", {});
  }
};

module.exports = {
  addEmployee,
  addManager,
  getManagers,
  getEmployees,
  deleteEmployee,
  deleteManager,
};
