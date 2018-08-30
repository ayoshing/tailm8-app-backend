const router = require("express").Router();
const passport = require("passport");
const userController = require("../../controllers/users.controller");

router.post("/register", userController.createUser);
router.post("/login", userController.logInUser);

// Private routes
// router.get('/current', passport.authenticate('jwt', { session: false }), userController.getCurrentUser);
// router.delete('/delete', userController.deleteUser);
// router.put('/udpate', userController.updateUser);

module.exports = router;
