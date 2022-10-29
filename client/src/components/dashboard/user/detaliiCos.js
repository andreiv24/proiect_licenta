import React from "react";
import { renderCardImage } from "utils/tools";
import DeleteIcon from "@mui/icons-material/Delete"
import { Link } from "react-router-dom";

const DetaliiCos = ({ produse, removeItem }) => {

    const renderItems = () => (
        produse ?
            produse.map((produs, index) => (
                <div className="user_product_block" key={`${produs._id}${index}`}>
                    <Link to={`/detalii_produs/${produs._id}`}>
                    <div className="item">
                        <div className="image"
                            style={{
                                background: `url(${renderCardImage(produs.imagini)}) no-repeat`
                            }}
                        >
                        </div>
                    </div>
                    </Link>
                    <div className="item">
                    <Link to={`/detalii_produs/${produs._id}`}>
                        <h4>{produs.categorie.denumire}</h4>
                        </Link>
                        <Link to={`/detalii_produs/${produs._id}`}>
                        <div>
                            {produs.denumire_produs}
                        </div>
                        </Link>
                    </div>
                    {
                        produs.pret === 1 ?
                            <div className="item">
                                <h4>Preț:</h4>
                                <div>
                                    {produs.pret} leu
                                </div>
                            </div>
                            :
                            <div className="item">
                                <h4>Preț:</h4>
                                <div>
                                    {produs.pret} lei
                                </div>
                            </div>
                    }
                    <div className="item btn">
                        <div className="cart_remove_btn" onClick={() => removeItem(index)}>
                            <DeleteIcon/>
                        </div>
                    </div>
                </div>
            ))
            : null
    )

    return (
        <div>
            {renderItems()}
        </div>
    )
}

export default DetaliiCos;