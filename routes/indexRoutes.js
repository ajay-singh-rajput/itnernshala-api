const express = require('express');
const { homepage, studentSignup, studentSignIn, studentSignOut, currentUser, studentSendMail, studentForgetLink, studentResetPassword, studentUpdate, studentAvatar } = require('../controllers/indexController');
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

// POST /student/send-mail
router.post('/student/send-mail',studentSendMail);

// get /student/forgot-link/:id
router.get('/student/forgot-link/:id',studentForgetLink);

// post /student/reset-password
router.post('/student/reset-password', isAuthenticated, studentResetPassword);

// post /student/update/:id
router.post('/student/update/:id', isAuthenticated, studentUpdate);

// post /student/avatar/:id
router.post('/student/avatar/:id', isAuthenticated, studentAvatar);

module.exports = router;