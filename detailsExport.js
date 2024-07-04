import { Media, TVSeries, Movie } from "./src/model/detailsData.model.js";
import detailsData from "./detailsData.json" assert { type: "json" }; // Fix the import statement for JSON data
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Media.deleteMany();

    await Media.create(detailsData);

    console.log("Database Created");
  } catch (e) {
    console.log("Something went wrong");
    console.error(e); // Log the specific error for debugging
    console.log("Please try again later");
  }
};

start();
