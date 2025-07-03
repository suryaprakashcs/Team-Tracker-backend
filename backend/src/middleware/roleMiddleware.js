const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ mgs: "Access denied" });
    }
    next();
  };
};

module.exports = { authorizeRoles };
