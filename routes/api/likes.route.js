const router = require("express").Router();
const passport = require("passport");
const likeController = require("../../controllers/likes.controller");

router.get("/:id/likes", likeController.getPostLikes);
router.post(
  "/:id/likes",
  passport.authenticate("jwt", { session: false }),
  likeController.addLikeToPost
);
router.delete(
  "/:id/likes",
  passport.authenticate("jwt", { session: false }),
  likeController.removeLikeFromPost
);

module.exports = router;
