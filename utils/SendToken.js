exports.sendToken = (user, statusCode, res)=>{
    const token = user.getJWTToken();
    const options = {
        expires:new Date(
            Date.now() + process.env.COOKIES_EXPIRE * 20 * 60 * 60  *1000
        ),
        httpOnly:true,
        // secure:true
    };
    res.status(statusCode)
    .cookie("token", token, options)
    .json({success:true, id:user._id, token})
}