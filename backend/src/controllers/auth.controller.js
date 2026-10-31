const asyncHandler = require("../utils/asyncHandler");
const { registerUser, loginUser } = require("../services/auth.service");

const register = asyncHandler(async (req, res) => {
  const session = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: session,
  });
});

const login = asyncHandler(async (req, res) => {
  const session = await loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: session,
  });
});

const logout = asyncHandler(async (req, res) => {
  req.user.tokenVersion += 1;
  await req.user.save();

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

module.exports = {
  register,
  login,
  logout,
};