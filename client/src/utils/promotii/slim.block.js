import React from 'react';

const SlimProm = ({items}) => {

    const renderPromotion = () => (
        items ?
        <div className="slim_promotion_img"
            style={{
                background: `url(${items.img})`
            }}
        >
            <div className="tag title">{items.lineOne}</div>
            <div className="tag low_title">{items.lineTwo}</div>
        </div>
        :null
    )

    return(
        <div className="slim_promotion">
            {renderPromotion()}
        </div>
    )
}

export default SlimProm;