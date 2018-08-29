const express = require('express');
const router = express.Router();


const profileController = require('../../controllers/profile.controller');

router.get('/test', profileController.test);
router.get('/:user_id', profileController.createProfile);


module.exports = router;
