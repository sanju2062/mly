const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();

// Connect to database
connectDB();

app.use(express.json({ extended: false }));
app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Define the directory where your HTML files (views) are located
app.set("views", path.join(__dirname, "views"));

// Define Routes
app.get("/", (req, res) => {
  try {
    res.status(200).render("index");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.use("/a", require("./routes/redirect"));
app.use("/api/url", require("./routes/url"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
