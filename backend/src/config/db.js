// module imports
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const DB = process.env.MONGO_URL.replace("<db_password>", process.env.PASSWORD);
// console.log(process.env.MONGO_URL);
const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log(`MongoDB Connected !!!`);
  } catch (error) {
    console.log("Connected Error : ", error.msg);
    process.exit(1);
  }
};

module.exports = connectDB;
