const { catchAsyncError } = require("../middlewares/catchAsyncError")

exports.homepage =catchAsyncError (async(req, res, next)=>{
    res.json({message:'homepage'})
})