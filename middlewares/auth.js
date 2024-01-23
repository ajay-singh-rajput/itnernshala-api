const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');
const { catchAsyncError } = require('./catchAsyncError');
const { head } = require('../routes/homeRoutes');

exports.isAuthenticated = catchAsyncError(async(req, res, next)=>{
    const headerData = req.headers.authorization
    const checkData = {
        id:headerData.split(' ')[0],
        token:headerData.split(' ')[1],
        userType:headerData.split(' ')[2],
    }
const {token} = checkData;

if(!token || (token === 'undefined')){
    return next(new ErrorHandler("Please login to access the resource", 401));
}
const {id} = jwt.verify(token, process.env.JWT_SECRET);
req.id = id
next();
});

