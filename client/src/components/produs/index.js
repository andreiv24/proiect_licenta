import React, { useEffect, useState } from "react";
import ProdusInfo from './produsInfo';

import { useDispatch, useSelector } from "react-redux";
import { produseById } from "store/actions/produs.actions";

import { renderCardImage } from "utils/tools";
import Loader from "utils/loader";
import { clearProdusCurent } from "store/actions";

import { Modal } from "react-bootstrap";
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const DetaliiProdus = (props) => {
    const [ modal, setModal ] = useState(false);
    const produse = useSelector(state => state.produse);
    const dispatch = useDispatch();
    const sliderSettings = {
        dot:false,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1
    }

    const handleClose = () => setModal(false);
    const handleCarrousel = () => {
        if(produse.byId.imagini.length > 0){
            setModal(true);
        }
    }

    useEffect(()=>{
        dispatch(produseById(props.match.params.id))
    },[dispatch, props.match.params.id])
    useEffect(()=>{
        return()=>{
            dispatch(clearProdusCurent())
        }
    },[dispatch])

    return(
        <div className="page_container">
            <div className="page_top">
                <div className="container">
                    Detalii produs
                </div>
            </div>
            <div className="container">
                { produse && produse.byId ?
                    <div className="product_detail_wrapper">
                        <div className="left">
                            <div>
                                <img
                                    alt="Fără imagine"
                                    src={renderCardImage(produse.byId.imagini)}
                                    onClick={()=> handleCarrousel()}
                                >
                                </img>
                            </div>
                        </div>
                        <div className="right">
                            <ProdusInfo
                                detail={produse.byId}
                            />
                        </div>
                    </div>
                :
                    <Loader/>
                }
            </div>
            <Modal show={modal} onHide={handleClose} dialogClassName="modal-90w">
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Slider {...sliderSettings}>
                        {
                            produse.byId && produse.byId.imagini ?
                                produse.byId.imagini.map((item)=>(
                                    <div key={item} style={{margin:'0 auto'}}>
                                        <div className="img-block"
                                            style={{
                                                background:`url(${item}) no-repeat`,
                                                height: `1300px`
                                            }}
                                        >
                                        </div>
                                    </div>
                                ))
                            :null
                        }
                    </Slider>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DetaliiProdus;