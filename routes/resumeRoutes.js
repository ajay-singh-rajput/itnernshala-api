const express = require('express');
const router = express.Router();
const {resume, addEducation, editEducation, deleteEducation, addJobs, editJobs, deleteJobs, addInternships, editInternships, deleteInternships, addResponsibilities, editResponsibilities, deleteResponsibilities } = require('../controllers/resumeController');
const { isAuthenticated } = require('../middlewares/auth');

// GET /
router.get('/',isAuthenticated, resume)


// ------ eduction crud -----------

// POST
router.post('/addEducation',isAuthenticated,addEducation);

// POST
router.post('/editEducation/:eduid',isAuthenticated,editEducation);
// POST

router.get('/deleteEducation/:eduid',isAuthenticated,deleteEducation);

// ------ jobs crud -----------

// POST
router.post('/addJobs',isAuthenticated,addJobs);

// POST
router.post('/editJobs/:eduid',isAuthenticated,editJobs);
// POST

router.get('/deleteJobs/:eduid',isAuthenticated,deleteJobs);

// ------ internships crud -----------

// POST
router.post('/addInternships',isAuthenticated,addInternships);

// POST
router.post('/editInternships/:eduid',isAuthenticated,editInternships);
// POST

router.get('/deleteInternships/:eduid',isAuthenticated,deleteInternships);

// ------ responsibilities crud -----------

// POST
router.post('/addResponsibilities',isAuthenticated,addResponsibilities);

// POST
router.post('/editResponsibilities/:eduid',isAuthenticated,editResponsibilities);
// POST

router.get('/deleteResponsibilities/:eduid',isAuthenticated,deleteResponsibilities);

// ------ project crud -----------

// POST
router.post('/addResponsibilities',isAuthenticated,addResponsibilities);

// POST
router.post('/editResponsibilities/:eduid',isAuthenticated,editResponsibilities);
// POST

router.get('/deleteResponsibilities/:eduid',isAuthenticated,deleteResponsibilities);



module.exports = router;