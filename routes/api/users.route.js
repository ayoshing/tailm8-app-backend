const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../../controllers/users.controller');

router.get('/test', userController.test);
router.post('/register', userController.createUser);
router.post('/login', userController.logInUser);

// Private routes
router.get('/current', userController.getCurrentUser);
// router.delete('/delete', userController.deleteUser);
// router.put('/udpate', userController.updateUser);

module.exports = router;
