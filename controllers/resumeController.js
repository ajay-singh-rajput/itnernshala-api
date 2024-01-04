const { catchAsyncError } = require("../middlewares/catchAsyncError")
const Student = require('../models/studentModel');
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/SendToken");
const { v4: uuidv4 } = require('uuid');

exports.resume =catchAsyncError (async(req, res, next)=>{
    const {resume} = await Student.findById(req.id).exec();
    res.json({message:'homepage', resume})
})
// ----- education crud ---------------
exports.addEducation =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:'education add successfully', resume})
})

exports.editEducation =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex((e)=>e.id === req.params.eduid);
    student.resume.education[eduIndex] = {...student.resume.education[eduIndex],...req.body,}
    await student.save();
    res.json({message:'education updated successfully', resume})
})

exports.deleteEducation =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const eduFiltered = student.resume.education.filter((e)=>e.id !== req.params.eduid);
    student.resume.education = eduFiltered
    await student.save();
    res.json({message:'education updated successfully', resume})
})

// ----- jobs crud ---------------
exports.addJobs =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:'jobs add successfully', resume})
})

exports.editJobs =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.jobs.findIndex((e)=>e.id === req.params.eduid);
    student.resume.jobs[eduIndex] = {...student.resume.jobs[eduIndex],...req.body,}
    await student.save();
    res.json({message:'jobs updated successfully', resume})
})

exports.deleteJobs =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const eduFiltered = student.resume.jobs.filter((e)=>e.id !== req.params.eduid);
    student.resume.jobs = eduFiltered
    await student.save();
    res.json({message:'jobs updated successfully', resume})
})

// ----- internships crud ---------------
exports.addInternships =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:'internships add successfully', resume})
})

exports.editInternships =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.internships.findIndex((e)=>e.id === req.params.eduid);
    student.resume.internships[eduIndex] = {...student.resume.internships[eduIndex],...req.body,}
    await student.save();
    res.json({message:'internships updated successfully', resume})
})

exports.deleteInternships =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const eduFiltered = student.resume.internships.filter((e)=>e.id !== req.params.eduid);
    student.resume.internships = eduFiltered
    await student.save();
    res.json({message:'internships updated successfully', resume})
})

// ----- responsibilities crud ---------------
exports.addResponsibilities =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:'responsibilities add successfully', resume})
})

exports.editResponsibilities =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.responsibilities.findIndex((e)=>e.id === req.params.eduid);
    student.resume.responsibilities[eduIndex] = {...student.resume.responsibilities[eduIndex],...req.body,}
    await student.save();
    res.json({message:'responsibilities updated successfully', resume})
})

exports.deleteResponsibilities =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const eduFiltered = student.resume.responsibilities.filter((e)=>e.id !== req.params.eduid);
    student.resume.responsibilities = eduFiltered
    await student.save();
    res.json({message:'responsibilities updated successfully', resume})
})

// ----- project crud ---------------
exports.addResponsibilities =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:'responsibilities add successfully', resume})
})

exports.editResponsibilities =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.responsibilities.findIndex((e)=>e.id === req.params.eduid);
    student.resume.responsibilities[eduIndex] = {...student.resume.responsibilities[eduIndex],...req.body,}
    await student.save();
    res.json({message:'responsibilities updated successfully', resume})
})

exports.deleteResponsibilities =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const eduFiltered = student.resume.responsibilities.filter((e)=>e.id !== req.params.eduid);
    student.resume.responsibilities = eduFiltered
    await student.save();
    res.json({message:'responsibilities updated successfully', resume})
})

// ----- skills crud ---------------
exports.addSkills =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:'skills add successfully', resume})
})

exports.editSkills =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.skills.findIndex((e)=>e.id === req.params.eduid);
    student.resume.skills[eduIndex] = {...student.resume.skills[eduIndex],...req.body,}
    await student.save();
    res.json({message:'skills updated successfully', resume})
})

exports.deleteSkills =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const eduFiltered = student.resume.skills.filter((e)=>e.id !== req.params.eduid);
    student.resume.skills = eduFiltered
    await student.save();
    res.json({message:'skills updated successfully', resume})
})

// ----- accomplishments crud ---------------
exports.addAccomplishments =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:'accomplishments add successfully', resume})
})

exports.editAccomplishments =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.accomplishments.findIndex((e)=>e.id === req.params.eduid);
    student.resume.accomplishments[eduIndex] = {...student.resume.accomplishments[eduIndex],...req.body,}
    await student.save();
    res.json({message:'accomplishments updated successfully', resume})
})

exports.deleteAccomplishments =catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const eduFiltered = student.resume.accomplishments.filter((e)=>e.id !== req.params.eduid);
    student.resume.accomplishments = eduFiltered
    await student.save();
    res.json({message:'accomplishments updated successfully', resume})
})

