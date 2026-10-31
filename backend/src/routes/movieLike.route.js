const express = require("express");

const { authenticate } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const movieLikeController = require("../controllers/movieLike.controller");
const { movieIdSchema } = require("../validation/watchlist.validation");

const router = express.Router();

router.use(authenticate);
router.get("/", movieLikeController.getLikedMovies);
router.put("/:movieId", validate(movieIdSchema, "params"), movieLikeController.likeMovie);
router.delete("/:movieId", validate(movieIdSchema, "params"), movieLikeController.unlikeMovie);

module.exports = router;
