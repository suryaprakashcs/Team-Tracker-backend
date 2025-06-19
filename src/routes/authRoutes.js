const express = require("express");
const {
  Login,
  Register,
  getProfile,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);

//Only Admin can access router

router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ msg: "Welcome Admin" });
});

//Both Admin & Manager can access router

router.get(
  "/manager",
  verifyToken,
  authorizeRoles("admin", "manager"),
  (req, res) => {
    res.json({ msg: "Welcome Manager" });
  }
);

//All can access this router

router.get(
  "/employee",
  verifyToken,
  authorizeRoles("admin", "manager", "employee"),
  (req, res) => {
    res.json({ msg: "Welcome Employee" });
  }
);

module.exports = router;
