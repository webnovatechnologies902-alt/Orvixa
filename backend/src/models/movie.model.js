const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    type: {
      type: String,
      enum: ["movie", "tv"],
      default: "movie",
      index: true,
    },
    year: {
      type: Number,
      min: 1888,
      max: 2200,
    },
    rating: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    duration: {
      type: String,
      trim: true,
      maxlength: 40,
    },
    durationSeconds: {
      type: Number,
      min: 1,
    },
    seasons: {
      type: Number,
      min: 1,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    backdrop: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    genres: {
      type: [String],
      default: [],
      validate: [(genres) => genres.length <= 20, "Cannot exceed 20 genres"],
    },
    averageRating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    isTopRated: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

movieSchema.index({ title: "text", description: "text", genres: "text" });

module.exports = mongoose.model("Movie", movieSchema);