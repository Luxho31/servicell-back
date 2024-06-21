// import { MercadoPagoConfig, Payment } from 'mercadopago';
import mercadopago from "mercadopago"

const createOrder = async (req, res) => {
    // mercadopago.configure({
    //     // access_token: process.env.ACCESS_TOKEN_MP
    //     access_token: "APP_USR-911176942514250-062021-91433ad2881fc4777132827883976717-1864627025"
    // });
    
    // Credencial Usuario de Prueba: APP_USR-911176942514250-062021-91433ad2881fc4777132827883976717-1864627025

    //-----------------------------------

    // const client = new MercadoPagoConfig({ accessToken: 'APP_USR-911176942514250-062021-91433ad2881fc4777132827883976717-1864627025'});

    // const payment = new Payment(client);

    // const body = {
    //     transaction_amount: 12.34,
    //     description: '<DESCRIPTION>',
    //     payment_method_id: '<PAYMENT_METHOD_ID>',
    //     payer: {
    //         email: '<EMAIL>'
    //     },
    // };

    // const requestOptions = {
    //     idempotencyKey: '<IDEMPOTENCY_KEY>',
    // };

    // payment.create({ body, requestOptions }).then(console.log).catch(console.log);

    //-----------------------------------------


    // const result = await mercadopago.preferences.create(preference)

    // const preference = {
    //     items: [
    //         {
    //             title: 'Dummy Product',
    //             unit_price: 100,
    //             currency_id: 'PEN',
    //             quantity: 1,
    //         }
    //     ],
    //     back_urls: {
    //         success: 'http://localhost:3000/success',
    //         failure: 'http://localhost:3000/failure',
    //         pending: 'http://localhost:3000/pending'
    //     },
    //     // auto_return: 'approved',
    //     notification_url: 'https://webhook.site/0e7a8c5f-9f4b-4c6b-8b0b-2c2a6f7c8f8d',
    //     // notification_url: 'http://localhost:3000/webhook',
    // };
    //  console.log(result);

    // res.json(result.body);

    //--------------------- NUEVO

    // Primero crear preferencia, back_urls, create a payer, 


    /*
        items : [ {},{}],
        user_ {
            nombre
        }
    */

    mercadopago.configurations.setAccessToken('TEST-2903472833152664-062021-0571c10c50994f61dc370174c6c96a8b-1762277778');

    const preference = {
        items: [
            {
                title: 'Dummy Product',
                unit_price: 100,
                currency_id: 'PEN',
                quantity: 1,
            }
        ],
        back_urls: {
            success: 'http://localhost:3000/success',
            failure: 'http://localhost:3000/failure',
            pending: 'http://localhost:3000/pending'
        },
        auto_return: 'approved',
        // auto_return: 'approved',
        notification_url: 'https://webhook.site/0e7a8c5f-9f4b-4c6b-8b0b-2c2a6f7c8f8d',
        // notification_url: 'http://localhost:3000/webhook',
    };

    try {
        const result = await mercadopago.preferences.create(preference);
        console.log(result);
        res.json({ link: result.body.init_point }); // Devuelve la URL de pago al cliente
    } catch (error) {
        console.error('Error al crear preferencia de pago:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }

    // const result = await mercadopago.preferences.create(preference)

    // console.log(result);
    //--------------------- NUEVO
}

const success = (req, res) => {
    res.send('Payment successful');
}

const failure = (req, res) => {
    res.send('Payment failed');
}

const pending = (req, res) => {
    res.send('Payment pending');
}

const receiveWebhook = (req, res) => {
    console.log(req.query);
    res.send('Webhook received');
}

export { createOrder, success, failure, pending, receiveWebhook };