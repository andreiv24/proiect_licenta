const { check, validationResult } = require('express-validator');
const httpStatus = require('http-status');

const adaugareProdusValidator = [
    check('denumire_produs')
        .trim().not().isEmpty().withMessage('Trebuie specificata obligatoriu denumirea produsului').bail()
        .isLength({min:3}).withMessage('Minim 3 caractere!').bail(),
    check('categorie')
        .trim().not().isEmpty().withMessage('Trebuie specificata obligatoriu categoria produsului'),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(httpStatus.BAD_REQUEST).json({
                errors: errors.array()
            })
        }
        next();
    }
];

module.exports = {
    adaugareProdusValidator
}