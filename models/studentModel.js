const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const studentModel = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, "first name is required"],
        minLength:[4, "First name should be at-least 4 character long"]
    },
    lastName:{
        type:String,
        required:[true, "last name is required"],
        minLength:[4, "Last name should be at-least 4 character long"]
    },
    
    contact:{
        type:String,
        required:[true, "contact is required"],
        minLength:[10, "Contact should be at-least 10 character long"],
        maxLength:[10, "Contact should not exceed more than 15 characters"],

    },
    city:{
        type:String,
        required:[true, "last name is required"],
        minLength:[3, "City name should be at-least 4 character long"]
    },
    gender:{
        type:String,
        enum:['Male',"Female","Other"]
    },
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
    avatar:{
        type:Object,
        default:{
            fileId:"",
            url:"https://images.unsplash.com/photo-1557844681-b0da6a516dc9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
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