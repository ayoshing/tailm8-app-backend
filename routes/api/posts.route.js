const router = require("express").Router();
const passport = require("passport");
const postController = require("../../controllers/posts.controller");

// Public Routes
router.get("/", postController.getPosts);
router.get("/:post_id", postController.getPost);

// Private Routes
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);
router.put(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  postController.updatePost
);
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  postController.deletePost
);

module.exports = router;
