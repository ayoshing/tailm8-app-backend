const express = require('express');
const router = express.Router();

const userController = require('../../controllers/users.controller');

router.get('/test', userController.test);
router.get('/all', userController.getAllUsers);
router.post('/create', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
