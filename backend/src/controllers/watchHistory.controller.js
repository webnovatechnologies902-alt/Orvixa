const asyncHandler = require("../utils/asyncHandler");
const watchHistoryService = require("../services/watchHistory.service");

const getWatchHistory = asyncHandler(async (req, res) => {
  const items = await watchHistoryService.listWatchHistory(req.user._id);
  res.status(200).json({
    success: true,
    data: { items, total: items.length },
  });
});

const getContinueWatching = asyncHandler(async (req, res) => {
  const items = await watchHistoryService.listContinueWatching(req.user._id);
  res.status(200).json({
    success: true,
    data: { items, total: items.length },
  });
});

const updateProgress = asyncHandler(async (req, res) => {
  const item = await watchHistoryService.updateProgress(req.user._id, req.body);
  res.status(200).json({
    success: true,
    message: "Watch progress saved",
    data: { item },
  });
});

const removeHistoryEntry = asyncHandler(async (req, res) => {
  await watchHistoryService.removeHistoryEntry(req.user._id, req.params.movieId);
  res.status(200).json({
    success: true,
    message: "Watch history entry removed",
  });
});

const clearWatchHistory = asyncHandler(async (req, res) => {
  const deletedCount = await watchHistoryService.clearWatchHistory(req.user._id);
  res.status(200).json({
    success: true,
    message: "Watch history cleared",
    data: { deletedCount },
  });
});

module.exports = {
  getWatchHistory,
  getContinueWatching,
  updateProgress,
  removeHistoryEntry,
  clearWatchHistory,
};