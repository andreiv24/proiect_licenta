const { produseService } = require('../services')

const produseController = {
    async adaugareProdus(req,res,next){
        try{
            const produs = await produseService.adaugareProdus(req.body);
            res.json(produs)
        }catch(error){
            next(error)
        }
    },
    async getProdusById(req,res,next){
        try{
            const _id = req.params.id;
            const produs = await produseService.getProdusById(_id);
            res.json(produs)
        }catch(error){
            next(error)
        }
    },
    async updateProdusById(req,res,next){
        try{
            const _id = req.params.id;
            const produs = await produseService.updateProdusById(_id, req.body);
            res.json(produs);
        }catch(error){
            next(error)
        }
    },
    async deleteProdusById(req,res,next){
        try{
            const _id = req.params.id;
            const produs = await produseService.deleteProdusById(_id, req.body);
            res.json(produs);
        }catch(error){
            next(error)
        }
    },
    async toateProdusele(req,res,next){
        try{
            const produse = await produseService.toateProdusele(req);
            res.json(produse);
        }catch(error){
            next(error)
        }
    },
    async paginateProduse(req,res,next){
        try{
            const produse = await produseService.paginateProduse(req)
            res.json(produse);
        } catch(error){
            next(error)
        }
    },
    async uploadImagine(req,res,next){
        try{
            const imagine = await produseService.uploadImagine(req);
            res.json(imagine);
        }catch(error){
            next(error)
        }
    }
}

module.exports = produseController;