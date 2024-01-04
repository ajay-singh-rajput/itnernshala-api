const express = require('express');
const router = express.Router();
const {resume, addEducation, editEducation, deleteEducation } = require('../controllers/resumeController');
const { isAuthenticated } = require('../middlewares/auth');

// GET /
router.get('/',isAuthenticated, resume)

// POST
router.post('/addEducation',isAuthenticated,addEducation);

// POST
router.post('/editEducation/:eduid',isAuthenticated,editEducation);
// POST

router.get('/deleteEducation/:eduid',isAuthenticated,deleteEducation);

module.exports = router;