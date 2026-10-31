const mongoose = require("mongoose");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { verifyToken } = require("../utils/jwt");

const authenticate = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;
  const [scheme, token] = authorization ? authorization.split(" ") : [];

  if (scheme !== "Bearer" || !token) {
    throw new ApiError(401, "Authentication is required");
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid or expired authentication token");
    }

    throw error;
  }

  if (!mongoose.isValidObjectId(payload.sub)) {
    throw new ApiError(401, "Invalid or expired authentication token");
  }

  const user = await User.findById(payload.sub);

  if (!user || !user.isActive || user.tokenVersion !== payload.tokenVersion) {
    throw new ApiError(401, "Invalid or expired authentication token");
  }

  req.user = user;
  next();
});

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, "You do not have permission to perform this action"));
  }

  next();
};

module.exports = {
  authenticate,
  authorizeRoles,
};