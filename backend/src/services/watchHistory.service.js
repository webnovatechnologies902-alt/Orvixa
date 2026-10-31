const Movie = require("../models/movie.model");
const WatchHistory = require("../models/watchHistory.model");
const ApiError = require("../utils/ApiError");
const { serializeMovie } = require("./movie.service");

const serializeHistoryEntry = (entry) => {
  const movie = serializeMovie(entry.movie);
  const durationSeconds = entry.durationSeconds || entry.movie.durationSeconds || null;

  return {
    ...movie,
    progressSeconds: entry.progressSeconds,
    durationSeconds,
    progress: durationSeconds
      ? Math.min(100, Math.round((entry.progressSeconds / durationSeconds) * 100))
      : null,
    lastWatchedAt: entry.lastWatchedAt,
  };
};

const getHistoryEntries = async (userId) =>
  WatchHistory.find({ user: userId })
    .sort({ lastWatchedAt: -1 })
    .populate({ path: "movie", match: { isActive: true } });

const listWatchHistory = async (userId) => {
  const entries = await getHistoryEntries(userId);
  return entries.filter((entry) => entry.movie).map(serializeHistoryEntry);
};

const listContinueWatching = async (userId) => {
  const entries = await getHistoryEntries(userId);
  return entries
    .filter((entry) => {
      if (!entry.movie || entry.progressSeconds <= 0) return false;
      const duration = entry.durationSeconds || entry.movie.durationSeconds;
      return !duration || entry.progressSeconds < duration;
    })
    .map(serializeHistoryEntry);
};

const updateProgress = async (userId, { movieId, progressSeconds, durationSeconds }) => {
  const movie = await Movie.findOne({ _id: movieId, isActive: true });
  if (!movie) throw new ApiError(404, "Movie or show not found");

  const actualDuration = durationSeconds || movie.durationSeconds;
  if (actualDuration && progressSeconds > actualDuration) {
    throw new ApiError(400, "Progress cannot exceed the title duration");
  }

  const updates = {
    progressSeconds,
    lastWatchedAt: new Date(),
  };
  if (actualDuration) updates.durationSeconds = actualDuration;

  const entry = await WatchHistory.findOneAndUpdate(
    { user: userId, movie: movieId },
    { $set: updates, $setOnInsert: { user: userId, movie: movieId } },
    { new: true, upsert: true, runValidators: true }
  ).populate("movie");

  return serializeHistoryEntry(entry);
};

const removeHistoryEntry = async (userId, movieId) => {
  const result = await WatchHistory.deleteOne({ user: userId, movie: movieId });
  if (!result.deletedCount) throw new ApiError(404, "Watch history entry not found");
};

const clearWatchHistory = async (userId) => {
  const result = await WatchHistory.deleteMany({ user: userId });
  return result.deletedCount;
};

module.exports = {
  listWatchHistory,
  listContinueWatching,
  updateProgress,
  removeHistoryEntry,
  clearWatchHistory,
};