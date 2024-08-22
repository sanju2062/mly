const mongoose = require("mongoose");
const config = require("config");
// const db = config.get("mongoURI");

const connectDB = async () => {
  mongoose
    .connect(
      "mongodb+srv://SanjuDeveloper:Mausam123@sanjudeveloper.rm0ud.mongodb.net/ABCD?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      }
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Connection error", err);
    });
};

module.exports = connectDB;
