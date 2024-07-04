import mongoose, { Schema } from "mongoose";

// Define the base schema for both movies and TV series
const mediaSchema = new Schema(
  {
    _id: Number,
    title: { type: String, required: true },
    poster_path: { type: String, require: true },
    release_date: { type: Date, required: true },
    genre: [{ type: String, required: true }],
    overview: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    type: { type: String, required: true, enum: ["Movie", "TV Series"] },
    cast: [{ type: String, required: true }],
    synopsis: { type: String, required: true },
    trailer: {
      url: { type: String, required: false },
      source: { type: String, required: false },
    },
    critic_reviews: [
      {
        source: { type: String, required: false },
        score: { type: String, required: false },
      },
    ],
    awards: [{ type: String, required: false }],
  },
  { discriminatorKey: "type", _id: false }
);

// Define the schema for movies
const movieSchema = new Schema({
  director: { type: String, required: false },
  runtime: { type: Number, required: false },
});

// Define the schema for TV series
const tvSeriesSchema = new Schema({
  creator: { type: String, required: false },
  seasons: { type: Number, required: true },
  episodes: { type: Number, required: false },
});

// Create the base model
const Media = mongoose.model("Media", mediaSchema);

// Create the discriminators
const Movie = Media.discriminator("Movie", movieSchema);
const TVSeries = Media.discriminator("TV Series", tvSeriesSchema);

export { Media, Movie, TVSeries };
