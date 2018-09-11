const router = require("express").Router();
const passport = require("passport");
const friendController = require("../../controllers/friends.controller");

router.get(
  "/friends",
  // passport.authenticate("jwt", { session: false }),
  friendController.getFriends
);

// router.post(
//   "/:username/friend",
//   passport.authenticate("jwt", { session: false }),
//   friendController.addFriend
// );
//
// router.delete(
//   "/:username/unfriend",
//   passport.authenticate("jwt", { session: false }),
//   friendController.removeFriend
// );

module.exports = router;
