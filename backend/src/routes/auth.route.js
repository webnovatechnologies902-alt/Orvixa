const express = require("express");

const validate = require("../middleware/validation.middleware");
const { registerSchema } = require("../validation/auth.validation");
const { register } = require("../controllers/auth.controller");

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);

module.exports = router;