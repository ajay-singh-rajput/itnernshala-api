const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");


exports.homePage = catchAsyncError(async (req, res, next)=>{
   
    console.log(req.id);
    res.json('this is home page')
})
