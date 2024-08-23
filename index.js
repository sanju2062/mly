const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const PORT = 5000;

const app = express();

// Connect to database
connectDB();

app.use("/static", express.static(path.join(__dirname, "static")));

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

// root/
//   routes/
//     redirect.js
//     url.js
//   static/
//     script.js
//     style.css
//   views/
//     index.ejs
//   index.js
