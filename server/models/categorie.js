const mongoose = require('mongoose');

const categorieStructura = mongoose.Schema({
    denumire:{
        required:true,
        type: String,
        unique: 1,
        maxlength:100
    }
});

const Categorie = mongoose.model('Categorie', categorieStructura);
module.exports = { Categorie };