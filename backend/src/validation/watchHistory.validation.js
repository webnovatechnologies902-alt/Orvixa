const Joi = require("joi");

const movieIdSchema = Joi.object({
  movieId: Joi.string().hex().length(24).required(),
});

const updateProgressSchema = Joi.object({
  movieId: Joi.string().hex().length(24).required(),
  progressSeconds: Joi.number().integer().min(0).required(),
  durationSeconds: Joi.number().integer().positive(),
});

module.exports = {
  movieIdSchema,
  updateProgressSchema,
};