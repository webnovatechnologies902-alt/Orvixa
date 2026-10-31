const express = require("express");

const { authenticate } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const watchlistController = require("../controllers/watchlist.controller");
const {
  movieIdSchema,
  addWatchlistSchema,
  watchlistQuerySchema,
} = require("../validation/watchlist.validation");

const router = express.Router();

router.use(authenticate);
router.get("/", validate(watchlistQuerySchema, "query"), watchlistController.getWatchlist);
router.post("/", validate(addWatchlistSchema), watchlistController.addToWatchlist);
router.delete(
  "/:movieId",
  validate(movieIdSchema, "params"),
  watchlistController.removeFromWatchlist
);

module.exports = router;