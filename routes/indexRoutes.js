const express = require('express');
const { homepage, studentSignup, studentSignIn, studentSignOut, currentUser, studentSendMail, studentForgetLink, studentResetPassword, studentUpdate, studentAvatar } = require('../controllers/indexController');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

// GET /
router.get('/', homepage)

// POST / student
router.post('/',isAuthenticated, currentUser)

// POST /student/signUp
router.post('/signup', studentSignup);

// POST /student/signIn
router.post('/signIn', studentSignIn);

// POST /student/signOut
router.get('/signOut',isAuthenticated, studentSignOut);

// POST /student/send-mail
router.post('/send-mail',studentSendMail);

// get /student/forgot-link/:id
router.get('/forgot-link/:id',studentForgetLink);

// post /student/reset-password
router.post('/reset-password', isAuthenticated, studentResetPassword);

// post /student/update/:id
router.post('/update/:id', isAuthenticated, studentUpdate);

// post /student/avatar/:id
router.post('/avatar/:id', isAuthenticated, studentAvatar);

module.exports = router;