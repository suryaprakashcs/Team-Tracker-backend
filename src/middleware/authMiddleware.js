const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  let authHeader =
    req.headers?.authorization ?? req.headers?.Authorization ?? "";

  if (!authHeader.startsWith("Bearer")) {
    let token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ msg: "Invalid token", error: err.message });
    }
  } else {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
};
