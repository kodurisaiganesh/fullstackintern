const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");

// Initialize Sequelize instance
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool || {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false, // optional: disable logging, remove or set to console.log for debugging
});

const db = {};

// Attach Sequelize and sequelize instances to db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require("./user.model")(sequelize, Sequelize);
db.Store = require("./store.model")(sequelize, Sequelize);
db.Rating = require("./rating.model")(sequelize, Sequelize);

// Setup associations
db.User.hasMany(db.Store, { foreignKey: "ownerId" });
db.Store.belongsTo(db.User, { foreignKey: "ownerId" });

db.User.hasMany(db.Rating, { foreignKey: "userId" });
db.Rating.belongsTo(db.User, { foreignKey: "userId" });

db.Store.hasMany(db.Rating, { foreignKey: "storeId" });
db.Rating.belongsTo(db.Store, { foreignKey: "storeId" });

module.exports = db;
