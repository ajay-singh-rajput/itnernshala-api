const { catchAsyncError } = require("../middlewares/catchAsyncError")
const Employee = require('../models/employeeModel');
const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path")
const { sendToken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const imagekit = require("../utils/imagekit").initImagekit();

exports.homepage =catchAsyncError (async(req, res, next)=>{
    res.json({message:'Employee homepage'})
})

exports.currentUser = catchAsyncError(async (req, res, next)=>{
    const employee = await Employee.findById(req.id).exec();
    res.json({employee})
})

exports.employeeSignup = catchAsyncError (async(req, res, next)=>{
    const employee = await new Employee(req.body).save();
    sendToken(employee, 201, res)
})

exports.employeeSignIn = catchAsyncError (async(req, res, next)=>{
    const employee = await Employee.findOne({email:req.body.email}).select("+password").exec();
    if(!employee) return next(new ErrorHandler("User not found", 404))

    const isMatch = employee.comparePassword(req.body.password);
    if(!isMatch) return next (new ErrorHandler("Wrong Credentials", 500));
    sendToken(employee, 200, res)
    // res.status(201).json(employee)
})

exports.employeeSignOut = catchAsyncError (async(req, res, next)=>{
    res.clearCookie('token');
    res.json({message:"successfully log out"})
})

exports.employeeSendMail = catchAsyncError (async(req, res, next)=>{
    const employee = await Employee.findOne({email:req.body.email}).exec();
    if(!employee){
        return next(new ErrorHandler("User not found with this email address", 404))
    }
    const url = `${req.protocol}://${req.get('host')}/employee/forgot-link/${employee._id}`
    sendmail(req, res, next, url);
    employee.resetPasswordToken = 1;
    await employee.save();
    res.json({employee, url})
})

exports.employeeForgetLink = catchAsyncError (async(req, res, next)=>{
    const employee = await Employee.findById(req.params.id).exec()
    if(!employee) return next( new ErrorHandler("User not found with email address", 404))
    if(employee.resetPasswordToken === 1){
        employee.password = req.body.password;
        employee.resetPasswordToken = 0;
        await employee.save();
    } else{
        return next( new ErrorHandler("Invalid Reset Password Link", 404))
    }
    res.status(200).json({message:"password is successfully changed"});
});


exports.employeeResetPassword = catchAsyncError (async(req, res, next)=>{
    const employee = await Employee.findById(req.id).exec()
        employee.password = req.body.password;
        await employee.save();
    sendToken(employee,201, res);
})

exports.employeeUpdate = catchAsyncError (async(req, res, next)=>{
    const employee = await Employee.findByIdAndUpdate(req.params.id,req.body).exec();
    res.status(200).json({
        success:true,
        message:"profile updated successfully",
        employee
    })
    // sendToken(employee, 201, res)
});

exports.employeeAvatar = catchAsyncError (async(req, res, next)=>{
    const employee = await Employee.findById(req.params.id);
    const file = req.files.avatar;
    const modifiedFileName = `resumeBuilder-${Date.now()}${path.extname(file.name)}`;

    if(employee.avatar.fileId !== ""){
        await imagekit.deleteFile(employee.avatar.fileId);
    }

    const {fileId, url} = await imagekit.upload({
        file:file.data,
        fileName:modifiedFileName,
    });
    employee.avatar = {fileId, url};
    await employee.save();
    res.status(200).json({
        success:true,
        message:"Profile updated!",
    })
})