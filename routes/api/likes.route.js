const router = require("express").Router();
const passport = require("passport");
const likeController = require("../../controllers/likes.controller");

// Likes routes
router.get("/:id/likes", likeController.getPostLikes);
router.post(
  "/:id/like",
  passport.authenticate("jwt", { session: false }),
  likeController.addLikeToPost
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  likeController.removeLikeFromPost
);

module.exports = router;
