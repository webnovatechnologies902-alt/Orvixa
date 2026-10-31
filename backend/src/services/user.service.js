const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const { toUserResponse } = require("./auth.service");

const getProfile = (user) => toUserResponse(user);

const updateProfile = async (user, updates) => {
  if (updates.email && updates.email !== user.email) {
    const existingUser = await User.findOne({ email: updates.email });
    if (existingUser) {
      throw new ApiError(409, "Email is already registered");
    }
  }

  Object.assign(user, updates);
  await user.save();
  return toUserResponse(user);
};

const updatePassword = async (user, { currentPassword, newPassword }) => {
  const userWithPassword = await User.findById(user._id).select("+password");

  if (
    !userWithPassword ||
    !(await bcrypt.compare(currentPassword, userWithPassword.password))
  ) {
    throw new ApiError(400, "Current password is incorrect");
  }

  userWithPassword.password = await bcrypt.hash(newPassword, 12);
  userWithPassword.tokenVersion += 1;
  await userWithPassword.save();
};

const updatePreferences = async (user, preferences) => {
  Object.assign(user.preferences, preferences);
  await user.save();
  return user.preferences;
};

module.exports = {
  getProfile,
  updateProfile,
  updatePassword,
  updatePreferences,
};