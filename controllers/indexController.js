const { catchAsyncError } = require("../middlewares/catchAsyncError")
const Student = require('../models/studentModel');

exports.homepage =catchAsyncError (async(req, res, next)=>{
    res.json({message:'homepage'})
})

exports.studentSignup = catchAsyncError (async(req, res, next)=>{
    const student = await new Student(req.body).save();
    res.status(201).json(student)
})