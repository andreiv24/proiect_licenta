const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userStructura = mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email invalid')
            }
        }
    },
    parola:{
        type:String,
        require:true,
        trim:true
    },
    rol:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    prenume:{
        type:String,
        maxLength: 100,
        trim:true,
        default:''
    },
    nume:{
        type:String,
        maxLength: 100,
        trim:true,
        default:''
    },
    cos:{
        type:Array,
        default:[]
    },
    istoric:{
        type:Array,
        default:[]
    },
    verificat:{
        type: Boolean,
        default: false
    }
});

userStructura.pre('save',async function(next){
    let user = this

    if(user.isModified('parola')){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.parola, salt);
        user.parola = hash;
        next()
    }
})

userStructura.methods.generateAuthToken = function(){
    let user = this;
    const userObj = { sub: user._id.toHexString() };
    const token = jwt.sign(userObj, process.env.DB_SECRET,{ expiresIn:'1d'});
    return token;
}

userStructura.methods.generateRegisterToken = function(){
    let user = this;
    const userObj = { sub: user._id.toHexString() };
    const token = jwt.sign(userObj, process.env.DB_SECRET,{ expiresIn:'5h'});
    return token;
}

userStructura.statics.emailTaken = async function(email){
    const user = await this.findOne({email});
    return !!user;
}

userStructura.methods.comparePassword = async function(candidatePassword){
    const user = this;
    const match = await bcrypt.compare(candidatePassword, user.parola);
    return match;
}

const User = mongoose.model('User',userStructura);
module.exports = { User };