const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  // try {
  //   await mongoose.connect(db, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true
  //   });

  //   console.log('MongoDB Connected...');
  // } catch (err) {
  //   console.error(err.message);
  //   process.exit(1);
  // }
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Connection error", err);
    });
};

module.exports = connectDB;
