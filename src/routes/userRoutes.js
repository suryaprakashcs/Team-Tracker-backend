const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const {
  addEmployee,
  addManager,
  getManagers,
  getEmployees,
} = require("../controllers/userController");

router.get("/managers", verifyToken, authorizeRoles("admin"), getManagers);
router.post("/manager", verifyToken, authorizeRoles("admin"), addManager);
router.get(
  "/empolyees",
  verifyToken,
  authorizeRoles("admin", "manager"),
  getEmployees
);
router.post(
  "/empolyee",
  verifyToken,
  authorizeRoles("admin", "manager"),
  addEmployee
);

module.exports = router;
