import React, { useEffect } from 'react';
import Featured from './featured';
import SlimProm from 'utils/promotii/slim.block';
import { useDispatch, useSelector } from 'react-redux';
import { produseBySort } from 'store/actions/produs.actions';
import Loader from 'utils/loader';
import CardBlock from 'utils/produse/card.blocks';

const slimProm = {
    img:'/imagini/prima_pagina/bun_venit.jpg',
    lineOne:'Bine ați venit pe site-ul librăriei online Edunet',
    lineTwo:'Aici veți găsi o gamă variată de produse utile pentru școală și liceu'
};

const Home = () => {
    const { byDate } = useSelector(state => state.produse)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(produseBySort({
            limit:4,sortBy:'data',order:'desc',where:'byDate'
        }));
    },[dispatch])

    return(
        <div>
            <SlimProm items={slimProm}/>
            <Featured/>
            { byDate ?
                <CardBlock
                    items={byDate}
                    title="Cele mai recent adăugate produse"
                />
            :<Loader/>}
        </div>
    )

}

export default Home;