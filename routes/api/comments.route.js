const router = require("express").Router();
const passport = require("passport");
const commentController = require("../../controllers/comments.controller");

router.get("/:id/comments", commentController.getPostComments);
router.post(
  "/:id/comments",
  passport.authenticate("jwt", { session: false }),
  commentController.addCommentToPost
);

module.exports = router;
