const { Site } = require('../models/site');
const { ApiError } = require('../middleware/apiError');
const httpStatus = require('http-status');

const postDateSite = async(req) => {
    try{
        const site = new Site({
            ...req.body
        });
        await site.save();
        return site;
    }catch(error){
        throw error;
    }
}

const getDateSite = async(req) => {
    try{
        const site = await Site.find({});
        if(!site) throw new ApiError(httpStatus.NOT_FOUND, 'Datele site-ului nu au fost găsite')
        return site[0];
    }catch(error){
        throw error;
    }
}

const actualizareDateSite = async(req) => {
    try{
        const site = await Site.findOneAndUpdate(
            { _id:req.body._id },
            { "$set": req.body },
            { new:true }
        );
        if(!site) throw new ApiError(httpStatus.NOT_FOUND, 'Datele site-ului nu au fost găsite')
        return site;
    }catch(error){
        throw error;
    }
}

module.exports = {
    postDateSite, getDateSite, actualizareDateSite
}