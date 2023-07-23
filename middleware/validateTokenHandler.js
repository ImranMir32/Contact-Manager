const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json("User is not authorized");
    }
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json("User is not authorized or token is missing");
  }
};

module.exports = validateToken;
