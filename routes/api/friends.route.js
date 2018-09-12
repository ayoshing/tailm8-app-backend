const router = require("express").Router();
const passport = require("passport");
const friendController = require("../../controllers/friends.controller");

router.get(
  "/friends",
  passport.authenticate("jwt", { session: false }),
  friendController.getFriends
);

router.post(
  "/:profile_id/friend",
  passport.authenticate("jwt", { session: false }),
  friendController.sendFriendRequest
);

// router.post(
//   "/:username/friend",
//   passport.authenticate("jwt", { session: false }),
//   friendController.acceptFriendRequest
// );

router.delete(
  "/:profile_id/unfriend",
  passport.authenticate("jwt", { session: false }),
  friendController.removeFriend
);

module.exports = router;
