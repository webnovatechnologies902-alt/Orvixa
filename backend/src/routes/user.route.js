const express = require("express");

const { authenticate } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const userController = require("../controllers/user.controller");
const {
  updateProfileSchema,
  updatePasswordSchema,
  updatePreferencesSchema,
} = require("../validation/user.validation");

const router = express.Router();

router.use(authenticate);
router.get("/me", userController.getProfile);
router.patch("/me", validate(updateProfileSchema), userController.updateProfile);
router.patch(
  "/me/password",
  validate(updatePasswordSchema),
  userController.updatePassword
);
router.patch(
  "/me/preferences",
  validate(updatePreferencesSchema),
  userController.updatePreferences
);

module.exports = router;