const router = require("express").Router();
const passport = require("passport");
const friendshipController = require("../../controllers/friendship.controller");

router.get(
  "/friends",
  passport.authenticate("jwt", { session: false }),
  friendshipController.getFriendsList
);

router.post(
  "/:profile_id/friends",
  passport.authenticate("jwt", { session: false }),
  friendshipController.getFriendsOfFriendsList
);

router.post(
  "/:profile_id/request-friend",
  passport.authenticate("jwt", { session: false }),
  friendshipController.sendFriendRequest
);

router.post(
  "/:profile_id/deny-friend",
  passport.authenticate("jwt", { session: false }),
  friendshipController.denyFriendRequest
);

router.post(
  "/:profile_id/accept-friend",
  passport.authenticate("jwt", { session: false }),
  friendshipController.acceptFriendRequest
);

router.delete(
  "/:profile_id/unfriend",
  passport.authenticate("jwt", { session: false }),
  friendshipController.removeFriend
);

module.exports = router;
