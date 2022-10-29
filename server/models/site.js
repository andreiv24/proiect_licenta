const mongoose = require('mongoose');

const siteStructura = mongoose.Schema({
    telefon:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
});

const Site = mongoose.model('Site',siteStructura);
module.exports = { Site }