const express = require('express');
const router = express.Router();
const passport = require('passport');

const profileController = require('../../controllers/profile.controller');

router.get('/test', profileController.test);
router.post('/', passport.authenticate('jwt', { session: false }), profileController.createProfile);


module.exports = router;
