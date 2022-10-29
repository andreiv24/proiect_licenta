const { ApiError } = require("../middleware/apiError");
const httpStatus = require('http-status');
const { Produs } = require("../models/produs");
const mongoose = require('mongoose');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:'dvlaiumig',
    api_key:'788853966226572',
    api_secret:`${process.env.API_SECRET}`
});

const adaugareProdus = async( body ) => {
    try{
        const produs = new Produs({
            ...body
        });
        await produs.save();
        return produs;
    } catch(error) {
        throw error
    }
}

const getProdusById = async( _id ) => {
    try{
        const produs = await Produs.findById(_id).populate('categorie');
        if(!produs) throw new ApiError(httpStatus.NOT_FOUND,'Produsul nu a fost găsit');
        return produs;
    } catch(error) {
        throw error
    }
}

const updateProdusById = async(_id, body) => {
    try {
        const produs = await Produs.findOneAndUpdate(
            {_id},
            { "$set" : body },
            { new: true }
        );
        if(!produs) throw new ApiError(httpStatus.NOT_FOUND, 'Produsul nu a fost găsit');
        return produs;
    } catch(error) {
        throw error
    }
}

const deleteProdusById = async(_id) => {
    try {
        const produs = await Produs.findByIdAndRemove(_id);
        if(!produs) throw new ApiError(httpStatus.NOT_FOUND, 'Produsul nu a fost găsit');
        return produs;
    } catch(error) {
        throw error
    }
}

const toateProdusele = async(req) => {
    try {
        const produse = await Produs
        .find({})
        .populate('categorie')
        .sort([
            [req.query.sortBy,req.query.order]
        ])
        .limit(parseInt(req.query.limit));
        return produse;
    } catch(error) {
        throw error
    }
}

const paginateProduse = async(req) => {
    try {
        let aggQueryArray = [];
        if (req.body.cuvinte_cheie && req.body.cuvinte_cheie != '') {
            const re = new RegExp(`${req.body.cuvinte_cheie}`,'gi');
            aggQueryArray.push({
                $match:{ denumire_produs: { $regex:re }}
            });
        }
        if (req.body.categorie && req.body.categorie.length > 0) {
            let categoriiNoi = req.body.categorie.map((item)=>(
                mongoose.Types.ObjectId(item)
            ));
            aggQueryArray.push({
                $match:{ categorie: { $in:categoriiNoi }}
            });
        }
        if (req.body.domeniul_educational && req.body.domeniul_educational.length > 0){
            aggQueryArray.push({
                $match:{ domeniul_educational: { $in:req.body.domeniul_educational }}
            });
        }
        if(req.body.min && req.body.min > 0 || req.body.max && req.body.max < 5000){
            if(req.body.min){
                aggQueryArray.push({ $match: { pret:{ $gt: req.body.min}}});
            }
            if(req.body.max){
                aggQueryArray.push({ $match: { pret:{ $lt: req.body.max}}});
            }
        }

        aggQueryArray.push(
            { $lookup:
                {
                    from: "categories",
                    localField: "categorie",
                    foreignField: "_id",
                    as: "categorie"
                }
            },
            { $unwind: '$categorie' }
        )

        let aggQuery = Produs.aggregate(aggQueryArray);
        const optiuniFiltrare = {
            page:req.body.page,
            limit:9,
            sort:{ data:'desc' }
        };
        const produse = await Produs.aggregatePaginate(aggQuery,optiuniFiltrare)
        return produse;
    } catch(error) {
        throw error
    }
}

const uploadImagine = async(req) => {
    try{
        const upload = await cloudinary.uploader.upload(req.files.file.path,{
            public_id:`${Date.now()}`,
            folder:'proiect_licenta'
        });
        console.log(upload);
        return {
            public_id:upload.public_id,
            url: upload.url
        }
    }catch(error){
        throw error
    }
}

module.exports = {
    adaugareProdus, getProdusById, updateProdusById, deleteProdusById, toateProdusele, paginateProduse, uploadImagine
}