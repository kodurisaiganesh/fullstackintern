const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
require("dotenv").config();

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (user.role === "system-admin") {
      next();
      return;
    }
    res.status(403).send({ message: "Require System Admin Role!" });
  } catch (err) {
    res.status(500).send({ message: "Unable to validate user role" });
  }
};

isStoreOwner = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (user.role === "store-owner") {
      next();
      return;
    }
    res.status(403).send({ message: "Require Store Owner Role!" });
  } catch (err) {
    res.status(500).send({ message: "Unable to validate user role" });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isStoreOwner
};

module.exports = authJwt;
