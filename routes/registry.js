const express = require('express');
const router = express.Router();
const registryCtrl = require('../controllers/movies');
const isLoggedIn = require('../config/auth');


// POST /movies (create functionality)
router.post('/', isLoggedIn, registryCtrl.create);

module.exports = router;
