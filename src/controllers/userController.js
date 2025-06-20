const User = require("../models/User");
const bcrypt = require("bcryptjs");

const addEmployee = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res.status(400).json({ message: "User Already Taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: "Empolyee created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server error", error: err.message });
  }
};

const addManager = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res.status(400).json({ message: "User Already Taken" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: "Manager created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server error", error: err.message });
  }
};

// Get all managers
const getManagers = async (req, res) => {
  try {
    const managers = await User.find({ role: "manager" }).select("-password");
    res.status(200).json(managers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server error", error: err.message });
  }
};

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");
    res.status(200).json(employees);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server error", error: err.message });
  }
};

module.exports = {
  addEmployee,
  addManager,
  getManagers,
  getEmployees,
};
