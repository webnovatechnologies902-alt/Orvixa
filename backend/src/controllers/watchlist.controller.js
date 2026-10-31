const asyncHandler = require("../utils/asyncHandler");
const watchlistService = require("../services/watchlist.service");

const getWatchlist = asyncHandler(async (req, res) => {
  const items = await watchlistService.listWatchlist(req.user._id, req.validatedQuery.type);
  res.status(200).json({
    success: true,
    data: { items, total: items.length },
  });
});

const addToWatchlist = asyncHandler(async (req, res) => {
  const movie = await watchlistService.addToWatchlist(req.user._id, req.body.movieId);
  res.status(200).json({
    success: true,
    message: "Title added to your list",
    data: { movie },
  });
});

const removeFromWatchlist = asyncHandler(async (req, res) => {
  await watchlistService.removeFromWatchlist(req.user._id, req.params.movieId);
  res.status(200).json({
    success: true,
    message: "Title removed from your list",
  });
});

module.exports = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
};