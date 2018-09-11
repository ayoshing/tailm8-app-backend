const router = require("express").Router();
const passport = require("passport");
const userController = require("../../controllers/users.controller");

// Public Routes
router.post("/", userController.createUser);
router.post("/login", userController.logInUser);
router.get("/", userController.getUsers);

// Private Routes
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  userController.getCurrentUser
);

module.exports = router;
