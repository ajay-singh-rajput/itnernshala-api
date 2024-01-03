const express = require('express');
const { homepage, studentSignup, studentSignIn, studentSignOut,currentUser } = require('../controllers/indexController');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

// GET /
router.get('/', homepage)

// POST / student
router.post('/student',isAuthenticated, currentUser)

// POST /student/signUp
router.post('/student/signup', studentSignup);

// POST /student/signIn
router.post('/student/signIn', studentSignIn);

// POST /student/signOut
router.get('/student/signOut',isAuthenticated, studentSignOut);

module.exports = router;