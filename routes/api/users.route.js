const express = require('express');
const router = express.Router();

const userController = require('../../controllers/users.controller');

router.get('/test', userController.test);
router.post('/register', userController.createUser);
router.post('/login', userController.logInUser);
// router.delete('/:id', userController.deleteUser);
// router.put('/:id', userController.updateUser);
// router.get('/:id', userController.getUser);
// router.get('/all', userController.getAllUsers);
// router.get('/current', userController.getCurrentUser);

module.exports = router;
