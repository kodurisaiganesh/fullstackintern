const express = require("express");
const router = express.Router();

const {
  submitRating,
  getUserRatings,
  getStoreRatings,
} = require("../controllers/rating.controller");

const { verifyToken } = require("../middlewares/authJwt");

// Submit a new rating
router.post("/", verifyToken, submitRating);

// Get all ratings submitted by the logged-in user
router.get("/user", verifyToken, getUserRatings);

// Get all ratings for a specific store
router.get("/store/:storeId", verifyToken, getStoreRatings);

module.exports = router;
