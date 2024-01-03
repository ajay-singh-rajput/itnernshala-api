const nodemailer = require("nodemailer");
const student = require("../models/studentModel");

exports.sendmail = (req, res, next, url)=>{
    const transport = nodemailer.createTransport({
        service:"gmail",
        host:"smpt.gmail.con",
        post:465,
        auth:{
            user:process.env.MAIL_EMAIL_ADDRESS,
            pass:process.env.MAIL_PASSWORD
        }
    })

    const mailOption ={
        from:"Indian Privet Limited",
        to:res.body.email,
        subject:"Password reset link",
        // text:"do not share this link anyone"
        html:`<h1>Click blow link to reset password</h1><a href="${url}">Password Rest Link</a>`
    };
    transport.sendMail(mailOption,(err, info)=>{
        if(err) return next(new ErrorHandler(err, 500));
        console.log(info);
        return res.status(200).json({
            message:"mail send successfully",
            url,
        })
    })
}