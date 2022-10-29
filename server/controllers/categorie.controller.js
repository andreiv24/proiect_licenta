const {categorieService} = require('../services');

const categorieController = {
    async adaugareCategorie(req,res,next){
        try{
            const categorie = await categorieService.adaugareCategorie(req.body.denumire);
            res.json(categorie);
        }catch(error){
            next(error)
        }
    },
    async getCategorie(req,res,next){
        try{
            const id = req.params.id;
            const categorie = await categorieService.getCategorieById(id);
            res.json(categorie);
        }catch(error){
            next(error)
        }
    },
    async deleteCategorie(req,res,next){
        try{
            const id = req.params.id;
            const categorie = await categorieService.deleteCategorieById(id);
            res.json(categorie);
        }catch(error){
            next(error)
        }
    },
    async getCategorii(req,res,next){
        try{
            const categorii = await categorieService.getCategorii(req.body);
            res.json(categorii);
        }catch(error){
            next(error)
        }
    },
    async editareCategorie(req,res,next){
        try{
            const _id = req.params.id;
            const categorie = await categorieService.editareCategorie(_id, req.body);
            res.json(categorie);
        }catch(error){
            next(error)
        }
    }
}

module.exports = categorieController;