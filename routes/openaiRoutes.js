const express = require('express');
const router = express.Router();
const { testSession } = require('../controllers/testController');

//////////////////////////////////////////////////
// TEST
//////////////////////////////////////////////////
router.post('/testSession', testSession);

module.exports = router;