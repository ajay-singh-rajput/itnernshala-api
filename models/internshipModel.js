const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const internshipModel = new mongoose.Schema({
    profile:String,
    skill:String,
    internshipType:{ type:String,enum:["In Office", "Remote"]},
    opening:Number,
    from:String,
    to:String,
    duration:String,
    responsibility:String,
    stipend:{
        status:{type:String, default:["Fixed","Negotiable","performance based", "Unpaid"]},
        amount:Number
    },
    perks:String,
    assessment:String,
    employee:{type:mongoose.Schema.Types.ObjectId, ref:'employee'},
    students:[{type:mongoose.Schema.Types.ObjectId, ref:'student'}],
},{timestamps:true});

const internship = mongoose.model('internship',internshipModel);
module.exports = internship;