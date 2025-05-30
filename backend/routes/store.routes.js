const router = require("express").Router();
const controller = require("../controllers/store.controller");
const { verifyToken, isAdmin, isStoreOwner } = require("../middlewares/authJwt");

// Admin can add stores
router.post("/", [verifyToken, isAdmin], controller.createStore);

// Public (normal user) & Admin can view stores
router.get("/", verifyToken, controller.getAllStores);

// Store owner dashboard view
router.get("/raters", [verifyToken, isStoreOwner], controller.getStoreRaters);

module.exports = router;
