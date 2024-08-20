const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect to database
connectDB();

app.use(express.json());
app.use("/static", express.static("static"));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Define the directory where your HTML files (views) are located
app.set("views", path.join(__dirname, "views"));

// Define Routes
app.get("/", (req, res) => {
  res.status(200).render("index");
});
app.use("/a", require("./routes/redirect"));
app.use("/api/url", require("./routes/url"));

const PORT = 2000;

module.exports = app;
