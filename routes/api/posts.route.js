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

module.exports = router;
