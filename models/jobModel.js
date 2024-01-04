const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const jobModel = new mongoose.Schema({
    title:String,
    skill:String,
    jobType:{ type:String,enum:["In Office", "Remote"]},
    opening:Number,
    description:String,
    preferences:String,
    salary:Number,
    perks:String,
    assessment:String,
    employee:{type:mongoose.Schema.Types.ObjectId, ref:'employee'},
    students:[{type:mongoose.Schema.Types.ObjectId, ref:'student'}],
},{timestamps:true});

const job = mongoose.model('job',jobModel);
module.exports = job;