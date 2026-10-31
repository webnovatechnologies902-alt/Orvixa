const express = require("express");

const validate = require("../middleware/validation.middleware");
const { authenticate } = require("../middleware/auth.middleware");
const { registerSchema, loginSchema } = require("../validation/auth.validation");
const { register, login, logout } = require("../controllers/auth.controller");

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);
router.post("/login", validate(loginSchema), login);
router.post("/logout", authenticate, logout);

module.exports = router;