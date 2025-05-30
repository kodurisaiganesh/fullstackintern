const db = require("../models");
const Rating = db.Rating;
const Store = db.Store;

// User: Submit or update rating
exports.submitRating = async (req, res) => {
  try {
    const userId = req.userId;
    const { storeId, rating, comment } = req.body;

    const store = await Store.findByPk(storeId);
    if (!store) return res.status(404).json({ message: "Store not found" });

    let userRating = await Rating.findOne({ where: { userId, storeId } });

    if (userRating) {
      userRating.rating = rating;
      userRating.comment = comment;
      await userRating.save();
      return res.json({ message: "Rating updated", data: userRating });
    } else {
      userRating = await Rating.create({ storeId, userId, rating, comment });
      return res.status(201).json({ message: "Rating submitted", data: userRating });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all ratings submitted by the logged-in user
exports.getUserRatings = async (req, res) => {
  try {
    const userId = req.userId;

    const ratings = await Rating.findAll({
      where: { userId },
      include: [{ model: Store, attributes: ["id", "name", "address"] }],
    });

    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all ratings for a specific store
exports.getStoreRatings = async (req, res) => {
  try {
    const { storeId } = req.params;

    const ratings = await Rating.findAll({
      where: { storeId },
      include: [{ model: Store, attributes: ["id", "name", "address"] }],
    });

    if (!ratings.length) return res.status(404).json({ message: "No ratings found for this store" });

    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
