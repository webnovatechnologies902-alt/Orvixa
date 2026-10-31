const Joi = require("joi");

const movieIdSchema = Joi.object({
  movieId: Joi.string().hex().length(24).required(),
});

const addWatchlistSchema = Joi.object({
  movieId: Joi.string().hex().length(24).required(),
});

const watchlistQuerySchema = Joi.object({
  type: Joi.string().valid("movie", "tv"),
});

module.exports = {
  movieIdSchema,
  addWatchlistSchema,
  watchlistQuerySchema,
};