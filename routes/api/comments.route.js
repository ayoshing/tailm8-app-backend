const router = require("express").Router();
const passport = require("passport");
const commentController = require("../../controllers/comments.controller");

router.get("/:post_id/comments", commentController.getPostComments);
router.get("/:post_id/comments/:comment_id", commentController.getPostComment);
router.post(
  "/:post_id/comments",
  passport.authenticate("jwt", { session: false }),
  commentController.addCommentToPost
);
router.delete(
  "/:post_id/comments/:comment_id",
  passport.authenticate("jwt", { session: false }),
  commentController.removeCommentFromPost
);

module.exports = router;
