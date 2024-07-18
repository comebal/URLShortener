const express = require('express');
const { create, get, getAll, reset, homepage, homepageJS, homepageCSS } = require('./controllers/urls');

const router = express.Router();

router.post('/create', create);
router.get('/s', getAll);
router.get('/s/:shortUrl', get);
router.post('/reset', reset);

router.get('/', homepage);
router.get('/main.js', homepageJS);
router.get('/main.css', homepageCSS);

module.exports  = router;
