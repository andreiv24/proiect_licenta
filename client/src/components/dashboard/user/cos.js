import React, { useState } from "react";
import DashboardLayout from "hoc/dashboardLayout";
import Loader from "utils/loader";
import DetaliiCos from "./detaliiCos";

import { useDispatch } from "react-redux";
import { scoatereProdusDinCos, userPurchaseSuccess } from "store/actions/user.actions";
import { PayPalButton } from "react-paypal-button-v2";
import { Button } from "react-bootstrap";

const CosCumparaturi = (props) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const removeItem = (pozitie) => {
        dispatch(scoatereProdusDinCos(pozitie))
    }

    const sumaTotala = () => {
        let total = 0;
        props.users.cos.forEach(item => {
            total += parseInt(item.pret, 10);
        });
        return total;
    }

    const generateUnits = () => (
        [{
            description: "Produsele unei librării online",
            amount: {
                currency_code: "EUR",
                value: sumaTotala()/5,
                breakdown: {
                    item_total: {
                        currency_code: "EUR",
                        value: sumaTotala()/5
                    }
                }
            },
            items: generateItems()
        }]
    );

    const generateItems = () => {
        let items = props.users.cos.map((item) => (
            {
                unit_amount: {
                    currency_code: "EUR",
                    value: item.pret/5
                },
                quantity: 1,
                name: item.denumire_produs
            }
        ));
        return items
    }

    return (
        <DashboardLayout title="Coș de cumpărături">
            {props.users.cos && props.users.cos.length > 0 ?
                <>
                    <DetaliiCos
                        produse={props.users.cos}
                        removeItem={(pozitie) => removeItem(pozitie)}
                    />
                    {
                        sumaTotala() === 1 ?
                            <div className="user_cart_sum">
                                <div>
                                    Suma totală: {sumaTotala()} leu
                                </div>
                            </div>
                            :
                            <div className="user_cart_sum">
                                <div>
                                    Suma totală: {sumaTotala()} lei
                                </div>
                            </div>
                    }
                    {
                        loading ?
                            <Loader />
                            :
                            <div className="pp_button">
                                <PayPalButton
                                    options={{
                                        clientId: "AUKK5O4YQYun29rq--1cpZDOxV6As9Mft7u5_zGAmiHI4d7rrylDdAmGr2126p_EWZBIVph87Oef5_9G",
                                        currency: "EUR"
                                    }}
                                    createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: generateUnits()
                                        })
                                    }}
                                    onSuccess={(details, data) => {
                                        dispatch(userPurchaseSuccess(details.id));
                                        setLoading(true);
                                    }}
                                    onCancel={(data)=>{
                                        setLoading(false);
                                    }}
                                />
                            </div>
                    }
                </>
                :
                <div>
                    <div>
                    Nu aveți niciun produs în coș. Puteți descoperi o mare varietate de produse, alegând ce vă place, la secțiunea "Librărie".
                    <p></p>
                    <div><Button href="/librarie">Librărie</Button></div>
                    </div>
                    <br/>
                    <div>
                    De-asemenea, puteți vedea istoricul cumpărăturilor făcute de dvs. la secțiunea "Contul meu".
                    <p></p>
                    <div><Button href="/contul_meu">Contul meu</Button></div>
                    </div>
                </div>
                
            }
        </DashboardLayout>
    )
}

export default CosCumparaturi;