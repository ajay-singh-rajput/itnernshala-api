const { catchAsyncError } = require("../middlewares/catchAsyncError")
const Student = require('../models/studentModel');
const Internship = require('../models/internshipModel');
const Job = require('../models/jobModel');
const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path")
const { sendToken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const imagekit = require("../utils/imagekit").initImagekit();

exports.homepage =catchAsyncError (async(req, res, next)=>{
    console.log(req.id);
    res.json({message:'homepage'})
})

exports.currentUser = catchAsyncError(async (req, res, next)=>{
    console.log(req.id);
    const student = await Student.findById(req.id).exec();
    res.json({student})
})

exports.studentSignup = catchAsyncError (async(req, res, next)=>{
    const student = await new Student(req.body).save();
    sendToken(student, 201, res)
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

exports.studentSendMail = catchAsyncError (async(req, res, next)=>{
    const student = await Student.findOne({email:req.body.email}).exec();
    if(!student){
        return next(new ErrorHandler("User not found with this email address", 404))
    }
    const url = `${req.protocol}://${req.get('host')}/student/forgot-link/${student._id}`
    sendmail(req, res, next, url);
    student.resetPasswordToken = 1;
    await student.save();
    res.json({student, url})
})

exports.studentForgetLink = catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.params.id).exec()
    if(!student) return next( new ErrorHandler("User not found with email address", 404))
    if(student.resetPasswordToken === 1){
        student.password = req.body.password;
        student.resetPasswordToken = 0;
        await student.save();
    } else{
        return next( new ErrorHandler("Invalid Reset Password Link", 404))
    }
    res.status(200).json({message:"password is successfully changed"});
});


exports.studentResetPassword = catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.id).exec()
        student.password = req.body.password;
        await student.save();
    sendToken(student,201, res);
})

exports.studentUpdate = catchAsyncError (async(req, res, next)=>{
    const student = await Student.findByIdAndUpdate(req.params.id,req.body).exec();
    res.status(200).json({
        success:true,
        message:"profile updated successfully",
        student
    })
    // sendToken(student, 201, res)
});

exports.studentAvatar = catchAsyncError (async(req, res, next)=>{
    const student = await Student.findById(req.params.id);
    const file = req.files.avatar;
    const modifiedFileName = `resumeBuilder-${Date.now()}${path.extname(file.name)}`;

    if(student.avatar.fileId !== ""){
        await imagekit.deleteFile(student.avatar.fileId);
    }

    const {fileId, url} = await imagekit.upload({
        file:file.data,
        fileName:modifiedFileName,
    });
    student.avatar = {fileId, url};
    await student.save();
    res.status(200).json({
        success:true,
        message:"Profile updated!",
    })
})



// ---------------- applyInternship ----------------
exports.applyInternship = catchAsyncError(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const internship = await Internship.findById(req.params.id).exec();

    student.internships.push(internship._id);
    internship.students.push(student._id);

    await student.save();
    await internship.save();
})


// ---------------- applyJob ----------------

exports.applyJob = catchAsyncError(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    const job = await Job.findById(req.params.id).exec();

    student.jobs.push(job._id);
    job.students.push(student._id);

    await student.save();
    await job.save();
})
