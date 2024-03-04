const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log("Authorization Header:", authorization);

  try {
    if (!authorization) {
      throw new Error("Authorization token required");
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      throw new Error("Invalid token format");
    }

    const { _id } = jwt.verify(token, process.env.SECRET);
    console.log("Decoded Token:", { _id });

    // Fetch user data from the database based on _id
    const user = await User.findOne({ _id }).select("_id roles");

    if (!user) {
      throw new Error("User not found");
    }

    // Attach user data to the request object
    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    if (error.name === "TokenExpiredError") {
      // Handle expired token separately
      return res.status(401).json({ error: "Token has expired" });
    }

    res.status(401).json({ error: "Request is not authorized", details: error.message });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.roles && req.user.roles.includes("admin")) {
    next();
  } else {
    res.status(401).json({ error: "Not authorized as an admin" });
  }
};

module.exports = { requireAuth, admin };
