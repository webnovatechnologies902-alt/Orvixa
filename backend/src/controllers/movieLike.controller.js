const asyncHandler = require("../utils/asyncHandler");
const movieLikeService = require("../services/movieLike.service");

const getLikedMovies = asyncHandler(async (req, res) => {
  const items = await movieLikeService.listLikedMovies(req.user._id);
  res.status(200).json({
    success: true,
    data: { items, total: items.length },
  });
});

const likeMovie = asyncHandler(async (req, res) => {
  const movie = await movieLikeService.likeMovie(req.user._id, req.params.movieId);
  res.status(200).json({
    success: true,
    message: "Title liked",
    data: { movie, liked: true },
  });
});

const unlikeMovie = asyncHandler(async (req, res) => {
  await movieLikeService.unlikeMovie(req.user._id, req.params.movieId);
  res.status(200).json({
    success: true,
    message: "Like removed",
    data: { liked: false },
  });
});

module.exports = {
  getLikedMovies,
  likeMovie,
  unlikeMovie,
};
