const express = require('express');
const { homePage } = require('../controllers/homeController');
const router = express.Router();

router.get('/', homePage);

module.exports = router