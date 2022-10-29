const AccessControl = require('accesscontrol');

const sarcini = {
    'create:any':['*'],
    'read:any':['*'],
    'update:any':['*'],
    'delete:any':['*']
}

let listaRoluri = {
    admin:{
        profil:sarcini,
        categorie:sarcini,
        produs:sarcini,
        site:sarcini,
        tranzactie:sarcini
    },
    user:{
        profil:{
            'read:own':['*','!parola','!_id'],
            'update:own':['*']
        },
        categorie:{ 'read:any':['*'] },
        produs:{ 'read:any':['*'] },
        tranzactie:{ 'create:any':['*'], 'read:any':['*'], }
    }
}

const roles = new AccessControl(listaRoluri)

module.exports = { roles }