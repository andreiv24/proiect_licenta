const { Categorie } = require("../models/categorie");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require('http-status');

const adaugareCategorie = async( denumire ) => {
    try{
        const categorie = new Categorie({
            denumire:denumire
        });
        await categorie.save();
        return categorie;
    }catch(error){
        throw error;
    }
}

const getCategorieById = async(id) =>{
    try{
        const categorie = await Categorie.findById(id);
        if(!categorie) throw new ApiError(httpStatus.NOT_FOUND,'Această categorie nu există')
        return categorie;
    } catch(error){
        throw error;
    }
}

const deleteCategorieById = async(id) =>{
    try{
        const categorie = await Categorie.findByIdAndRemove(id);
        return categorie;
    } catch(error){
        throw error;
    }
}

const editareCategorie = async(_id, body) =>{
    try {
        const categorie = await Categorie.findOneAndUpdate(
            {_id},
            { "$set" : body },
            { new: true }
        );
        if(!categorie) throw new ApiError(httpStatus.NOT_FOUND, 'Categoria nu a fost găsită');
        return categorie;
    } catch(error) {
        throw error
    }
}

const getCategorii = async(args) =>{
    try{
        let ordine = args.ordine ? args.ordine : "desc";
        let limita = args.limita ? args.limita : 100;
        const categorii = await Categorie
        .find({})
        .sort([
            ["_id",ordine]
        ])
        .limit(limita);
        if (!categorii) throw new ApiError(httpStatus.NOT_FOUND,'Nu au fost găsite categorii')
        return categorii;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    adaugareCategorie, getCategorieById, deleteCategorieById, editareCategorie, getCategorii
}