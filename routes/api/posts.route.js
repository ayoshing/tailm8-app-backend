const router = require("express").Router();
const passport = require("passport");
const postController = require("../../controllers/posts.controller");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);
router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.updatePost
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.deletePost
);

// // Likes routes
// router.get("/:id/likes", postController.getPostLikes);
// router.post(
//   "/:id/like",
//   passport.authenticate("jwt", { session: false }),
//   postController.addLikeToPost
// );
// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   postController.removeLikeFromPost
// );

// // Comments routes
// router.get("/:id/comments", postController.getPostComments);
// router.post(
//   "/:id/comment",
//   passport.authenticate("jwt", { session: false }),
//   postController.addCommentToPost
// );

module.exports = router;
