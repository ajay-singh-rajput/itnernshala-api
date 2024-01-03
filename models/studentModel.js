const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const studentModel = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:[true, "Email is required"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password:{
        type:String,
        select:false,
        maxLength:[15, 'Password should not exceed more than 15 characters'],
        minLength:[6, 'Password should not exceed more than 15 characters'],
        // match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/]
    },
    resetPasswordToken:{
        type:Number,
        default:0
    },
},{timestamps:true});

studentModel.pre("save",function (){

    if(!this.isModified('password')){
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

studentModel.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}
studentModel.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}

const student = mongoose.model('student',studentModel);

module.exports = student;