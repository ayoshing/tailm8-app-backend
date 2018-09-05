const router = require("express").Router();
const passport = require("passport");
const profileController = require("../../controllers/profile.controller");

// Public Routes
router.get("/users", profileController.getProfiles);
router.get("/users/:user_id", profileController.getProfile);

// Private Routes
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.getCurrentProfile
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.createOrUpdateProfile
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteUserAndProfile
);

module.exports = router;
