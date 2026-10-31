const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const { generateToken } = require("../utils/jwt");

const toUserResponse = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  role: user.role,
  preferences: user.preferences,
  createdAt: user.createdAt,
});

const createSession = (user) => ({
  token: generateToken({
    sub: user._id.toString(),
    tokenVersion: user.tokenVersion,
  }),
  user: toUserResponse(user),
});

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return createSession(user);
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user || !user.isActive || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, "Email or password is incorrect");
  }

  return createSession(user);
};

module.exports = {
  registerUser,
  loginUser,
  toUserResponse,
};