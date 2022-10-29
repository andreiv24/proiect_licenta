const mongoose = require('mongoose');
const validator = require('validator');

const structuraTranzactie = mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    userEmail:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Adresa de e-mail este invalida')
            }
        }
    },
    orderID:{
        type:String,
        required:true,
    },
    orderData:{
        type:Array,
        required:true,
        default:[]
    },
    data_tranzactie:{
        type:Date,
        default:Date.now
    }
});

const Tranzactie = mongoose.model('Tranzactie', structuraTranzactie);
module.exports = { Tranzactie };