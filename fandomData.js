import { Data } from "./src/model/user.model.js";
import allData from "./fandomData.json" assert { type: "json" }; // Fix the import statement for JSON data
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Data.deleteMany();

    await Data.create(allData);

    console.log("Database Created");
  } catch (e) {
    console.log("Something went wrong");
    console.error(e); // Log the specific error for debugging
    console.log("Please try again later");
  }
};

start();
