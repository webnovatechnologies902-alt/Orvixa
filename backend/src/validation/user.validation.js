const Joi = require("joi");

const updateProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50),
  email: Joi.string().trim().lowercase().email(),
  avatar: Joi.string()
    .trim()
    .uri({ scheme: ["http", "https"] })
    .allow("", null),
}).min(1);

const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).max(100).required(),
});

const updatePreferencesSchema = Joi.object({
  language: Joi.string().trim().min(2).max(30),
  playbackQuality: Joi.string().valid("auto", "low", "medium", "high"),
  notificationsEnabled: Joi.boolean(),
}).min(1);

module.exports = {
  updateProfileSchema,
  updatePasswordSchema,
  updatePreferencesSchema,
};
