const Joi = require("joi");

const movieFields = {
  title: Joi.string().trim().min(1).max(160),
  type: Joi.string().valid("movie", "tv"),
  year: Joi.number().integer().min(1888).max(2200),
  rating: Joi.string().trim().max(20).allow(""),
  duration: Joi.string().trim().max(40).allow(""),
  durationSeconds: Joi.number().integer().positive(),
  seasons: Joi.number().integer().positive(),
  image: Joi.string().trim().uri({ scheme: ["http", "https"] }),
  backdrop: Joi.string().trim().uri({ scheme: ["http", "https"] }).allow(""),
  description: Joi.string().trim().max(5000).allow(""),
  genres: Joi.array().items(Joi.string().trim().min(1).max(40)).max(20),
  averageRating: Joi.number().min(0).max(10),
  isFeatured: Joi.boolean(),
  isTrending: Joi.boolean(),
  isPopular: Joi.boolean(),
  isTopRated: Joi.boolean(),
};

const createMovieSchema = Joi.object({
  ...movieFields,
  title: movieFields.title.required(),
  image: movieFields.image.required(),
});

const updateMovieSchema = Joi.object(movieFields).min(1);

const movieIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const movieListQuerySchema = Joi.object({
  search: Joi.string().trim().max(100).allow(""),
  q: Joi.string().trim().max(100).allow(""),
  type: Joi.string().valid("movie", "tv"),
  genre: Joi.string().trim().max(40),
  sort: Joi.string().valid("trending", "popular", "top-rated", "newest"),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
});

const movieTypeQuerySchema = Joi.object({
  type: Joi.string().valid("movie", "tv").default("movie"),
});

const movieGenresQuerySchema = Joi.object({
  type: Joi.string().valid("movie", "tv"),
});

module.exports = {
  createMovieSchema,
  updateMovieSchema,
  movieIdSchema,
  movieListQuerySchema,
  movieTypeQuerySchema,
  movieGenresQuerySchema,
};