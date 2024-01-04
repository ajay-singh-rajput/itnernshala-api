const { catchAsyncError } = require("../middlewares/catchAsyncError")
const Employee = require('../models/employeeModel');
const Internship = require("../models/internshipModel")
const Job = require("../models/jobModel")
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

exports.employeeLogo = catchAsyncError (async(req, res, next)=>{
    const employee = await Employee.findById(req.params.id);
    const file = req.files.organizationLogo;
    const modifiedFileName = `resumeBuilder-${Date.now()}${path.extname(file.name)}`;

    if(employee.organizationLogo.fileId !== ""){
        await imagekit.deleteFile(employee.organizationLogo.fileId);
    }

    const {fileId, url} = await imagekit.upload({
        file:file.data,
        fileName:modifiedFileName,
    });
    employee.organizationLogo = {fileId, url};
    await employee.save();
    res.status(200).json({
        success:true,
        message:"Profile updated!",
    })
})



// ----------- Internship ----------

exports.createInternship = catchAsyncError(async(req, res, next)=>{
    const internship = await Internship(req.body);
    internship.employee = req.id;
    const employee = await Employee.findById(req.id).exec();
    employee.internships.push(internship._id);
    await internship.save();
    await employee.save();
    res.status(201).json({success:true, internship})
})


exports.readInternship = catchAsyncError(async(req, res, next)=>{
    const {internships} = await Employee.findById(req.id).populate("internships").exec();
    res.status(201).json({success:true, internships})
})


exports.readSingleInternship = catchAsyncError(async(req, res, next)=>{
    const internship = await Internship.findById(req.params.id).exec();
    if(!internship) return new ErrorHandler("Internship not found")
    res.status(201).json({success:true, internship});
})


// ----------- Job ----------

exports.createJob = catchAsyncError(async(req, res, next)=>{
    const Job = await Job(req.body);
    Job.employee = req.id;
    const employee = await Employee.findById(req.id).exec();
    employee.Jobs.push(Job._id);
    await Job.save();
    await employee.save();
    res.status(201).json({success:true, Job})
})


exports.readJob = catchAsyncError(async(req, res, next)=>{
    const {Jobs} = await Job.findById(req.id).populate("Jobs").exec();
    res.status(201).json({success:true, Jobs})
})


exports.readSingleJob = catchAsyncError(async(req, res, next)=>{
    const Job = await Job.findById(req.params.id).exec();
    if(!Job) return new ErrorHandler("Job not found")
    res.status(201).json({success:true, Job});
})