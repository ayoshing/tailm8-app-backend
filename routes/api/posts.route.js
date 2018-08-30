const router = require("express").Router();
const passport = require("passport");

const postController = require("../../controllers/posts.controller");

router.get("/test", postController.test);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

module.exports = router;
