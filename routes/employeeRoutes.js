const express = require('express');
const { homepage, employeeSignup, employeeSignIn, employeeSignOut, currentUser, employeeSendMail, employeeForgetLink, employeeResetPassword, employeeUpdate, employeeLogo, createInternship, readInternship, readSingleInternship, readSingleJob, readJob, createJob } = require('../controllers/employeeController');
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

// post /employee/logo/:id
router.post('/logo/:id', isAuthenticated, employeeLogo);




//---------- internship ------------

// post /employee/internship/create
router.post('/internship/create', isAuthenticated, createInternship)

// post /employee/internship/read
router.post('/internship/read', isAuthenticated, readInternship)

// post /employee/internship/read/:id
router.post('/internship/read/:id', isAuthenticated, readSingleInternship)

//---------- job ------------

// post /employee/job/create
router.post('/job/create', isAuthenticated, createJob)

// post /employee/job/read
router.post('/job/read', isAuthenticated, readJob)

// post /employee/job/read/:id
router.post('/job/read/:id', isAuthenticated, readSingleJob)

module.exports = router;