const express = require('express');
const router = express.Router();

const userController = require('../../controllers/users.controller');

router.get('/test', userController.test);
router.get('/all', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/register', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
// router.get('/current', userController.getCurrentUser);

module.exports = router;
