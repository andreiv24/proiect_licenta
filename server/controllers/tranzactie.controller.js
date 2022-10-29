const { tranzactieService } = require('../services');

const tranzactieController = {
    async adaugareTranzactie(req,res,next) {
        try{
            const data = await tranzactieService.adaugareTranzactie(req);
            res.json(data)
        } catch {
            next(error)
        }
    }
}

module.exports = tranzactieController;