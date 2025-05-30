// server.js

require("dotenv").config();
const app = require("./app");
const db = require("./models");

const PORT = process.env.PORT || 5000;

// Sync the DB once and then start the server
db.sequelize.sync({ force: true })  // or { alter: true } if you want to keep data
  .then(() => {
    console.log("✅ Database dropped and re-synced.");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error syncing database:", err);
  });
