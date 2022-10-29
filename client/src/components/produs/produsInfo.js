import React, { useState } from "react";
import { ApplicationButton } from "utils/tools";
import AdaugareInCos from "utils/adaugareInCos";

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import { useSelector, useDispatch } from "react-redux";
import { userAdaugareInCos } from "store/actions/user.actions";
import * as actions from 'store/actions/index';

const ProdusInfo = (props) => {
    const [modal, setModal] = useState(false);
    const [errorType, setErrorType] = useState(null);
    const user = useSelector(state => state.users);
    const dispatch = useDispatch();

    const handleClose = () => setModal(false);
    const handleAddToCart = (item) => {
        if(!user.auth){
            setModal(true);
            setErrorType('auth');
            return false;
        }
        if(!user.data.verificat){
            setModal(true);
            setErrorType('verificare');
            return false;
        }
        dispatch(userAdaugareInCos(item))
    }

    const handleNoProd = () => {
        if (!user.auth) {
            setModal(true);
            setErrorType('auth');
            return false;
        }
        if (!user.data.verificat) {
            setModal(true);
            setErrorType('verificare');
            return false;
        }
        dispatch(actions.errorGlobal("Produsul nu este disponibil în acest moment"))
    }

    const showProdTags = (detail) => (
        <div className="product_tags">
            <div className="tag">
                <div><LocalShippingIcon /></div>
                <div className="tag_text">
                    {detail.livrare ?
                        <div>Produsul va fi livrat la domiciliu</div>
                        :
                        <div>Produsul va putea fi ridicat doar de la punctele noastre de colectare din țară</div>
                    }
                </div>
            </div>
            {detail.in_stoc > 1 ?
                <div className="tag">
                    <div><DoneOutlineIcon /></div>
                    <div className="tag_text">
                        <div>Produsul este disponibil în stoc</div>
                    </div>
                </div>
                : detail.in_stoc === 1 ?
                <div className="tag">
                    <div><DoneOutlineIcon /></div>
                    <div className="tag_text">
                    <div>Produsul este disponibil în stoc</div>
                    </div>
                </div>
                :
                <div className="tag">
                    <div><NotInterestedIcon /></div>
                    <div className="tag_text">
                        <div>Produsul nu este disponibil în acest moment</div>
                    </div>
                </div>
            }
        </div>
    )

    const showProdActions = (detail) => (
        <div className="product_actions">
            {
                detail.pret === 1 ?
                <div className="price">{detail.pret} leu</div>
                :
                <div className="price">{detail.pret} lei</div>
            }
            {
                detail.in_stoc > 0 ?
                <div className="cart">
                <ApplicationButton
                        type="adauga_in_cos"
                        runAction={() => handleAddToCart(detail)}
                    />
                </div>
                :
                <div className="cart">
                <ApplicationButton
                        type="adauga_in_cos"
                        runAction={() => handleNoProd()}
                    />
                </div>
            }
        </div>
    )

    const showProdSpecs = (detail) => (
        <div className="product_specifications">
            <h2>Informații suplimentare:</h2>
            <div>
                <div className="item">
                    <strong>Produs recomandat {detail.domeniul_educational}</strong>
                </div>
            </div>
        </div>
    )

    const detail = props.detail
    return (
        <div>
            <h1>{detail.denumire_produs}</h1>
            <p>
                {detail.descriere}
            </p>
            {showProdTags(detail)}
            {showProdActions(detail)}
            {showProdSpecs(detail)}
            <AdaugareInCos
                modal={modal}
                errorType={errorType}
                handleClose={handleClose}
            />
        </div>
    )
}

export default ProdusInfo;