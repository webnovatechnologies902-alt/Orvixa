const Movie = require("../models/movie.model");
const Watchlist = require("../models/watchlist.model");
const ApiError = require("../utils/ApiError");
const { serializeMovie } = require("./movie.service");

const listWatchlist = async (userId, type) => {
  const entries = await Watchlist.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "movie",
      match: { isActive: true, ...(type ? { type } : {}) },
    });

  return entries
    .filter((entry) => entry.movie)
    .map((entry) => ({
      movie: serializeMovie(entry.movie),
      addedAt: entry.createdAt,
    }));
};

const addToWatchlist = async (userId, movieId) => {
  const movie = await Movie.findOne({ _id: movieId, isActive: true });
  if (!movie) throw new ApiError(404, "Movie or show not found");

  await Watchlist.updateOne(
    { user: userId, movie: movieId },
    { $setOnInsert: { user: userId, movie: movieId } },
    { upsert: true }
  );

  return serializeMovie(movie);
};

const removeFromWatchlist = async (userId, movieId) => {
  const result = await Watchlist.deleteOne({ user: userId, movie: movieId });
  if (!result.deletedCount) throw new ApiError(404, "Title was not in your list");
};

module.exports = {
  listWatchlist,
  addToWatchlist,
  removeFromWatchlist,
};