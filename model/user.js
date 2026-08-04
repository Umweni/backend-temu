const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        select: false
    },
    role:{
        type: String,
        enum:["ADMIN", "VENDOR", "USER"],
        default: "USER"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);
