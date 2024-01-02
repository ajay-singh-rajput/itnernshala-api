const express = require('express');
const { homepage, studentSignup } = require('../controllers/indexController');
const router = express.Router();

// GET /
router.get('/', homepage)

// POST /student/signup
router.post('/student/signup', studentSignup);

module.exports = router;