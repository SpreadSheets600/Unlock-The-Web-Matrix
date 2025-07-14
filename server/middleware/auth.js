const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({
      error: "No token",
    });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.user = decoded;
    next();
  } catch {
    res.status(400).json({
      error: "Invalid token",
    });
  }
};
