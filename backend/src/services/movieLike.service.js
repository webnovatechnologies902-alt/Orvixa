const Movie = require("../models/movie.model");
const MovieLike = require("../models/movieLike.model");
const ApiError = require("../utils/ApiError");
const { serializeMovie } = require("./movie.service");

const listLikedMovies = async (userId) => {
  const likes = await MovieLike.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate({ path: "movie", match: { isActive: true } });

  return likes
    .filter((like) => like.movie)
    .map((like) => ({
      movie: serializeMovie(like.movie),
      likedAt: like.createdAt,
    }));
};

const likeMovie = async (userId, movieId) => {
  const movie = await Movie.findOne({ _id: movieId, isActive: true });
  if (!movie) throw new ApiError(404, "Movie or show not found");

  await MovieLike.updateOne(
    { user: userId, movie: movieId },
    { $setOnInsert: { user: userId, movie: movieId } },
    { upsert: true }
  );
  return serializeMovie(movie);
};

const unlikeMovie = async (userId, movieId) => {
  const result = await MovieLike.deleteOne({ user: userId, movie: movieId });
  if (!result.deletedCount) throw new ApiError(404, "Title was not liked");
};

module.exports = {
  listLikedMovies,
  likeMovie,
  unlikeMovie,
};
