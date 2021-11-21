const express = require('express');
const {graphHandler,homepageHandler,_404} = require('../controller/graphHandler');
const router = express.Router();
//routes
router.get('/',homepageHandler);
router.get('/graph',graphHandler);
router.post('/graph',graphHandler)
router.use(_404);


//exporting modules
module.exports = router;