const db = require("../models");
const Store = db.Store;
const User = db.User;
const { Op } = require("sequelize");

// Admin: Add a store (with ownerId)
exports.createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    const owner = await User.findByPk(ownerId);
    if (!owner || owner.role !== "store-owner") {
      return res.status(400).json({ message: "Invalid store owner" });
    }

    const store = await Store.create({ name, email, address, ownerId });
    res.status(201).json(store);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin/User: Get all stores (with optional search)
exports.getAllStores = async (req, res) => {
  try {
    const { name, address } = req.query;

    const stores = await Store.findAll({
      where: {
        ...(name && { name: { [Op.like]: `%${name}%` } }),
        ...(address && { address: { [Op.like]: `%${address}%` } })
      },
      include: [
        {
          model: db.Rating,
          attributes: ["rating"]
        }
      ]
    });

    // Calculate average rating
    const result = stores.map(store => {
      const ratings = store.ratings.map(r => r.rating);
      const average =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;
      return {
        ...store.toJSON(),
        averageRating: average.toFixed(2)
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Store Owner: Get raters of own store
exports.getStoreRaters = async (req, res) => {
  try {
    const ownerId = req.userId;
    const store = await Store.findOne({
      where: { ownerId },
      include: [
        {
          model: db.Rating,
          include: [{ model: db.User, attributes: ["name", "email"] }]
        }
      ]
    });

    if (!store) return res.status(404).json({ message: "Store not found" });

    const ratings = store.ratings.map(rating => ({
      rating: rating.rating,
      user: rating.user
    }));

    const avg =
      ratings.length > 0
        ? ratings.reduce((a, b) => a + b.rating, 0) / ratings.length
        : 0;

    res.json({ ratings, average: avg.toFixed(2) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
