const router = require("express").Router();
const passport = require("passport");
const likeController = require("../../controllers/likes.controller");

router.get("/:post_id/likes", likeController.getPostLikes);
router.post(
  "/:post_id/likes",
  passport.authenticate("jwt", { session: false }),
  likeController.addRemoveLikeToPost
);

module.exports = router;
