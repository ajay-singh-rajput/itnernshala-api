exports.sendToken = (student, statusCode, res)=>{
    const token = student.getJWTToken();
    const options = {
        expires:new Date(
            Date.now() + process.env.COOKIES_EXPIRE * 20 * 60 * 60  *1000
        ),
        httpOnly:true,
        // secure:true
    };
    res.status(statusCode)
    .cookie("token", token, options)
    .json({success:true, id:student._id, token})
}