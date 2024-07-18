const express = require('express');
const { create, get, getAll, reset } = require('./controllers/urls');

const router = express.Router();

router.post('/create', create);
router.get('/s', getAll);
router.get('/s/:shortUrl', get);
router.post('/reset', reset);

module.exports  = router;
