const express = require("express");

const { authenticate } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const watchHistoryController = require("../controllers/watchHistory.controller");
const {
  movieIdSchema,
  updateProgressSchema,
} = require("../validation/watchHistory.validation");

const router = express.Router();

router.use(authenticate);
router.get("/continue-watching", watchHistoryController.getContinueWatching);
router.get("/", watchHistoryController.getWatchHistory);
router.put("/", validate(updateProgressSchema), watchHistoryController.updateProgress);
router.delete("/", watchHistoryController.clearWatchHistory);
router.delete(
  "/:movieId",
  validate(movieIdSchema, "params"),
  watchHistoryController.removeHistoryEntry
);

module.exports = router;