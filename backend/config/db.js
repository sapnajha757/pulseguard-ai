const mongoose = require("mongoose");
const env = require("./env");

const connectDB = async () => {
  try {
    console.log("ENV OBJECT:");
    console.log(env);

    console.log("Mongo URI:");
    console.log(env.mongoUri);

    const conn = await mongoose.connect(env.mongoUri);

    console.log("✅ MongoDB Connected:", conn.connection.host);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;