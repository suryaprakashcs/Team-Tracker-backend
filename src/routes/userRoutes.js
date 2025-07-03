const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const {
  addEmployee,
  addManager,
  getManagers,
  getEmployees,
  deleteEmployee,
  deleteManager,
} = require("../controllers/userController");

const onlyAdmin = authorizeRoles("admin");
const onlyAdminOrManager = authorizeRoles("admin", "manager");
const allAreAuthorized = authorizeRoles("admin", "manager", "employee ");

// Manager Routes
router.get("/managers", verifyToken, onlyAdmin, getManagers);
router.post("/manager", verifyToken, onlyAdmin, addManager);
router.delete("/manager", verifyToken, onlyAdmin, deleteManager);

//Employee Routes
router.get("/empolyees", verifyToken, onlyAdminOrManager, getEmployees);
router.post("/empolyee", verifyToken, onlyAdminOrManager, addEmployee);
router.delete("/empolyee", verifyToken, onlyAdminOrManager, deleteEmployee);

module.exports = router;
