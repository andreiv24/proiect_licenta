const { User } = require("../models/user");
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const userService = require('./user.service');

const createUser = async(email,parola,prenume,nume) => {
    try{
        if(await User.emailTaken(email)){
            throw new ApiError(httpStatus.BAD_REQUEST, 'Adresa de e-mail este deja utilizată');
        }
        const user = new User({
            email,
            parola,
            prenume,
            nume
        });
        await user.save();
        return user;
    } catch(error){
        throw error;
    }
}

const genAuthToken = (user) => {
    const token = user.generateAuthToken();
    return token;
}

const signInEmailPassword = async(email, parola) => {
    try{
        const user = await userService.findUserByEmail(email)
        if(!user){
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Adresa de e-mail este incorectă');
        }
        if(!(await user.comparePassword(parola))){
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Parola este incorectă');
        }
        return user;
    } catch(error){
        throw error;
    }
}

module.exports = {
    createUser, genAuthToken, signInEmailPassword
}