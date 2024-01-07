const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');
const { catchAsyncError } = require('./catchAsyncError');

exports.isLoggedInCheck = catchAsyncError(async(req, res, next)=>{
const {token} = req.cookies;
if(!token){
    req.id = null
    return next();
}
const {id} = jwt.verify(token, process.env.JWT_SECRET);
req.id = id
next();
})