const express = require('express');
const router = express.Router();
const registryCtrl = require('../controllers/registries');
const isLoggedIn = require('../config/auth');




// GET /registry
router.get('/', registryCtrl.index);
// GET /registries/new (new functionality)
router.get('/new', registryCtrl.new);
// GET /registries/:id (show functionality)
router.get('/:id', registryCtrl.show);
// POST /registry (create functionality)
router.post('/', isLoggedIn, registryCtrl.create);

router.delete('/:id', registryCtrl.delete);

router.put('/:id', registryCtrl.update);

router.get('/:id/edit', registryCtrl.edit);

module.exports = router;
