// app.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/stores", require("./routes/store.routes"));
app.use("/api/ratings", require("./routes/rating.routes"));
app.use("/api/users", require("./routes/user.routes"));

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Store Rating API");
});

module.exports = app;
