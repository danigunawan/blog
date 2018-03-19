var express = require('express');
var router = express.Router();
const {create,index,find, update, destroy} = require('../controllers/ArticleController');

const { auth } = require('../middleware/auth');

router.post('/',auth,create);
router.get('/',index);
router.get('/:id',find);
router.put('/:id',auth,update);
router.delete('/:id',auth,destroy);

module.exports = router;
