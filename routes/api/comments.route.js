const router = require("express").Router();
const passport = require("passport");
const commentController = require("../../controllers/comments.controller");

// Comments routes
router.get("/:id/comments", commentController.getPostComments);
router.post(
  "/:id/comment",
  passport.authenticate("jwt", { session: false }),
  commentController.addCommentToPost
);

module.exports = router;
