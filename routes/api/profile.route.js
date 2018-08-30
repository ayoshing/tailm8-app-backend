const router = require("express").Router();
const passport = require("passport");

const profileController = require("../../controllers/profile.controller");

router.get("/test", profileController.test);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.createOrUpdateProfile
);
router.get("/users", profileController.getAllProfiles);
router.get("/users/:user_id", profileController.getUserProfile);

module.exports = router;
