const { catchAsyncError } = require("../middlewares/catchAsyncError")
const Student = require('../models/studentModel');
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/SendToken");
const { v4: uuidv4 } = require('uuid');

exports.resume =catchAsyncError (async(req, res, next)=>{
    const {resume} = await Student.findById(req.id).exec();
    res.json({message:'homepage', resume})
})

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