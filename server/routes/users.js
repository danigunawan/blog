var express = require('express');
var router = express.Router();
const {signin, getProfile, updateProfile} = require('../controllers/UserController');
const {auth} = require('../middleware/auth.js');

router.post('/signin',signin);
router.get('/profile',auth,getProfile);
router.put('/profile',auth,updateProfile);

module.exports = router;
