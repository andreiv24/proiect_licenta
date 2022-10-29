const { User } = require("../models/user");
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = async(token) => {
    return jwt.verify(token, process.env.DB_SECRET)
}

const findUserByEmail = async(email) =>{
    return await User.findOne({email:email})
}

const findUserById = async(_id) =>{
    return await User.findById(_id)
}

const updateUserProfile = async(req) => {
    try{
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                "$set":{
                    ...req.body.data
                }
            },
            { new: true }
        );
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND,'Utilizatorul nu a fost găsit');
        }
        return user;
    } catch(error){
        throw error;
    }
}

const updateUserEmail = async(req) => {
    try {
        if(await User.emailTaken(req.body.emailnou)){
            throw new ApiError(httpStatus.BAD_REQUEST,'Adresa de email este deja folosită');
        }

        const user = await User.findOneAndUpdate(
            { _id: req.user._id, email: req.user.email },
            {
                "$set":{
                    email: req.body.emailnou,
                    verificat:false
                }
            },
            { new: true }
        );
        if(!user){
            throw new ApiError(httpStatus.NOT_FOUND,'Utilizatorul nu a fost găsit');
        }
        return user;
    }catch(error){
        throw error;
    }
}

module.exports = {
    findUserByEmail, findUserById, updateUserProfile, updateUserEmail, validateToken
}