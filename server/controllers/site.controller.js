const { siteService } = require('../services');

const siteController = {
    async postDateSite(req,res,next){
        try{
            const site = await siteService.postDateSite(req);
            res.json(site);
        }catch(error){
            next(error)
        }
    },
    async getDateSite(req,res,next){
        try{
            const site = await siteService.getDateSite(req);
            res.json(site);
        }catch(error){
            next(error)
        }
    },
    async actualizareDateSite(req,res,next){
        try{
            const site = await siteService.actualizareDateSite(req);
            res.json(site);
        }catch(error){
            next(error)
        }
    }
};

module.exports = siteController