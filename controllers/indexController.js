const { catchAsyncError } = require("../middlewares/catchAsyncError")
const Student = require('../models/studentModel');
const ErrorHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/SendToken");

exports.homepage =catchAsyncError (async(req, res, next)=>{
    res.json({message:'homepage'})
})

exports.currentUser = catchAsyncError(async (req, res, next)=>{
    const student = await Student.findById(req.id).exec();

    res.json({student})
})

exports.studentSignup = catchAsyncError (async(req, res, next)=>{
    const student = await new Student(req.body).save();
    sendToken(student, 201, res)
    res.status(201).json(student)
})

exports.studentSignIn = catchAsyncError (async(req, res, next)=>{
    const student = await Student.findOne({email:req.body.email}).select("+password").exec();
    if(!student) return next(new ErrorHandler("User not found", 404))

    const isMatch = student.comparePassword(req.body.password);
    if(!isMatch) return next (new ErrorHandler("Wrong Credentials", 500));
    sendToken(student, 200, res)
    // res.status(201).json(student)
})


exports.studentSignOut = catchAsyncError (async(req, res, next)=>{
    res.clearCookie('token');
    res.json({message:"successfully log out"})
})