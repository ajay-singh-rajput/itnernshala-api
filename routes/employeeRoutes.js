const express = require('express');
const { homepage, employeeSignup, employeeSignIn, employeeSignOut, currentUser, employeeSendMail, employeeForgetLink, employeeResetPassword, employeeUpdate, employeeAvatar } = require('../controllers/employeeController');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

// GET /
router.get('/', homepage)

// POST / employee
router.post('/',isAuthenticated, currentUser)

// POST /employee/signUp
router.post('/signup', employeeSignup);

// POST /employee/signIn
router.post('/signIn', employeeSignIn);

// POST /employee/signOut
router.get('/signOut',isAuthenticated, employeeSignOut);

// POST /employee/send-mail
router.post('/send-mail',employeeSendMail);

// get /employee/forgot-link/:id
router.get('/forgot-link/:id',employeeForgetLink);

// post /employee/reset-password
router.post('/reset-password', isAuthenticated, employeeResetPassword);

// post /employee/update/:id
router.post('/update/:id', isAuthenticated, employeeUpdate);

// post /employee/avatar/:id
router.post('/avatar/:id', isAuthenticated, employeeAvatar);

module.exports = router;