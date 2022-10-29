const { Tranzactie } = require('../models/tranzactie');
const { User } = require('../models/user');

const payPalClient = require('../utils/paypalclient');
const checkoutNodeJSsdk = require('@paypal/checkout-server-sdk');

const adaugareTranzactie = async(req) => {
    let request = new checkoutNodeJSsdk.orders.OrdersGetRequest(req.body.orderID);
    let order;

    try {
        order = await payPalClient.client.execute(request);
        const tranzactie = new Tranzactie({
            userID:req.user._id,
            userEmail:req.user.email,
            orderID:req.body.orderID,
            orderData:order.result,
        });
        await tranzactie.save();
        const user = await User.findOneAndUpdate(
            {_id:req.user._id},
            { "$push":{
                istoric:[
                    {
                        tranzactieId:tranzactie._id,
                        data_tranzactie:tranzactie.data_tranzactie,
                        orderID:req.body.orderID,
                        amount: tranzactie.orderData[0].purchase_units[0].amount.value,
                        items: tranzactie.orderData[0].purchase_units[0].items,
                    }
                ]
            }},
            { new:true }
        )
        return user;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    adaugareTranzactie
}