import React, { useState } from "react";
import { renderCardImage, ApplicationButton } from "../tools";
import AdaugareInCos from "utils/adaugareInCos";
import { useSelector, useDispatch } from "react-redux";
import { userAdaugareInCos } from "store/actions/user.actions";
import { Link } from 'react-router-dom';
import * as actions from 'store/actions/index';

const Card = (props) => {
    const [modal, setModal] = useState(false);
    const [errorType, setErrorType] = useState(null);
    const user = useSelector(state => state.users);
    const dispatch = useDispatch();
    const handleClose = () => setModal(false);
    const handleAddToCart = (item) => {
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

    return (
        <div className={`card_item_wrapper ${props.grid ? 'grid_bars' : ''}`}>

            <Link to={`/detalii_produs/${props.item._id}`}>
                <div
                    className="image"
                    style={{
                        background: `url(${renderCardImage(props.item.imagini)})`
                    }}
                ></div>
            </Link>
            <div className="action_container">
                {
                    props.item.pret === 1 ?
                        <div className="tags">
                            <div className="category">{props.item.categorie.denumire}</div>
                            <div className="name">
                                <Link to={`/detalii_produs/${props.item._id}`}>{props.item.denumire_produs}</Link>
                            </div>
                            <div className="price">{props.item.pret} leu
                            {
                                props.item.in_stoc > 0 ?
                                <div className="actions">
                                <div className="button_wrapp">
                                    <ApplicationButton
                                        type="bag_link"
                                        runAction={() => handleAddToCart(props.item)}
                                        iconSize="23"
                                    />
                                </div>
                            </div>
                            :
                            <div className="actions">
                                <div className="button_wrapp">
                                    <ApplicationButton
                                        type="bag_link"
                                        runAction={() => handleNoProd()}
                                        iconSize="23"
                                    />
                                </div>
                            </div>
                            }
                            </div>
                        </div>
                        :
                        <div className="tags">
                            <div className="category">{props.item.categorie.denumire}</div>
                            <div className="name">
                                <Link to={`/detalii_produs/${props.item._id}`}>{props.item.denumire_produs}</Link>
                            </div>
                            <div className="price">{props.item.pret} lei
                            {
                                props.item.in_stoc > 0 ?
                                <div className="actions">
                                <div className="button_wrapp">
                                    <ApplicationButton
                                        type="bag_link"
                                        runAction={() => handleAddToCart(props.item)}
                                        iconSize="23"
                                    />
                                </div>
                            </div>
                            :
                            <div className="actions">
                                <div className="button_wrapp">
                                    <ApplicationButton
                                        type="bag_link"
                                        runAction={() => handleNoProd()}
                                        iconSize="23"
                                    />
                                </div>
                            </div>
                            }
                            </div>
                        </div>
                }
                {props.grid ?
                    <div className="description">
                        <p>
                            {props.item.descriere}
                        </p>
                    </div>
                    : null}

            </div>
            <AdaugareInCos
                modal={modal}
                errorType={errorType}
                handleClose={handleClose}
            />
        </div>
    )
}

export default Card;