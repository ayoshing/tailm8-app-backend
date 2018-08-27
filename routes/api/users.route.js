const express = require('express');
const router = express.Router();

const userController = require('../../controllers/users.controller');

router.get('/test', userController.test);
router.post('/create', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id/update', userController.updateUser);
router.delete('/:id/delete', userController.deleteUser);

module.exports = router;
