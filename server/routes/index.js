const express = require('express');
const authRoute = require('./auth.route');
const usersRoute = require('./users.route');
const categoriiRoute = require('./categorie.route');
const produseRoute = require('./produs.route');
const siteRoute = require('./site.route');
const tranzactieRoute = require('./tranzactie.route');
const router = express.Router();

const routesIndex = [
    {
        path:'/auth',
        route: authRoute
    },
    {
        path:'/users',
        route: usersRoute
    },
    {
        path:'/categorii',
        route: categoriiRoute
    },
    {
        path:'/produse',
        route: produseRoute
    },
    {
        path:'/site',
        route: siteRoute
    },
    {
        path:'/tranzactie',
        route: tranzactieRoute
    }
]

routesIndex.forEach((route)=>{
    router.use(route.path, route.route);
})

module.exports = router;