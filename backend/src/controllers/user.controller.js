const asyncHandler = require("../utils/asyncHandler");
const userService = require("../services/user.service");

const getProfile = asyncHandler(async (req, res) => {
  const user = userService.getProfile(req.user);
  res.status(200).json({ success: true, data: { user } });
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user, req.body);
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: { user },
  });
});

const updatePassword = asyncHandler(async (req, res) => {
  await userService.updatePassword(req.user, req.body);
  res.status(200).json({
    success: true,
    message: "Password updated successfully. Please sign in again.",
  });
});

const updatePreferences = asyncHandler(async (req, res) => {
  const preferences = await userService.updatePreferences(req.user, req.body);
  res.status(200).json({
    success: true,
    message: "Preferences updated successfully",
    data: { preferences },
  });
});

module.exports = {
  getProfile,
  updateProfile,
  updatePassword,
  updatePreferences,
};