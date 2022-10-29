import React from 'react';
import Carrousel from 'utils/carrousel';

const Featured = () => {
    const carrouselItems = [
        {
            img:'/imagini/prima_pagina/prima_pagina_1.jpg',
            lineOne:'Susținem domeniul educațional',
            lineTwo:'Avem prețuri accesibile și livrare gratuită la toate produsele',
            linkTitle:'Descoperă produsele noastre',
            linkTo:'/librarie'
        },
        {
            img:'/imagini/prima_pagina/prima_pagina_2.jpg',
            lineOne:'Gama instrumentelor de scris',
            lineTwo:'Sunt disponibile diverse stilouri, pixuri și creioane în stoc',
            linkTitle:'Descoperă produsele noastre',
            linkTo:'/librarie'
        },
        {
            img:'/imagini/prima_pagina/prima_pagina_3.jpg',
            lineOne:'Gama literaturii școlare',
            lineTwo:'Sunt disponibile diverse produse pentru literatura școlară',
            linkTitle:'Descoperă produsele noastre',
            linkTo:'/librarie'
        },
        {
            img:'/imagini/prima_pagina/prima_pagina_4.jpg',
            lineOne:'Instrumente pentru orele de desen',
            lineTwo:'Sunt disponibile diverse produse recomandate orelor de desen',
            linkTitle:'Descoperă produsele noastre',
            linkTo:'/librarie'
        }
    ]
    return(
        <div className="featured_container">
            <Carrousel items={carrouselItems}/>
        </div>
    )
}

export default Featured;