const { authService, emailService } = require('../services');
const httpStatus = require('http-status');

const authController = {
    async register(req, res, next){
        try{
            const { email, parola, prenume, nume } = req.body;
            const user = await authService.createUser(email, parola, prenume, nume);
            const token = await authService.genAuthToken(user);
            await emailService.registerEmail(email,user);
            res.cookie('x-access-token',token).status(httpStatus.CREATED).send({
                user,
                token
            })
        }
        catch(error){
            next(error);
        }
        
    },
    async signin(req, res, next){
        try{
            const { email, parola } = req.body;
            const user = await authService.signInEmailPassword(email, parola);
            const token = await authService.genAuthToken(user);
            res.cookie('x-access-token',token).send({
                user,
                token
            })
        } catch(error){
            next(error);
        }
        
    },
    async isauth(req, res, next){
        res.json(req.user)
    }
}

module.exports = authController;