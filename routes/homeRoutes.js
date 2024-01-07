const express = require('express');
const { homePage } = require('../controllers/homeController');
const { isLoggedInCheck } = require('../middlewares/isLoggedIn');
const router = express.Router();

router.get('/',isLoggedInCheck, homePage);

module.exports = router