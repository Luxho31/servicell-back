import { MercadoPagoConfig, Payment } from 'mercadopago';

const createOrder = async (req, res) => {
    // mercadopago.configure({
    //     // access_token: process.env.ACCESS_TOKEN_MP
    //     access_token: "TEST-605985810472705-061802-bc26711c25e75c5f11986ed30bbef3e8-1762277778"
    // });

    const client = new MercadoPagoConfig({ accessToken: 'TEST-605985810472705-061802-bc26711c25e75c5f11986ed30bbef3e8-1762277778'});

    const payment = new Payment(client);

    const body = {
        transaction_amount: 12.34,
        description: '<DESCRIPTION>',
        payment_method_id: '<PAYMENT_METHOD_ID>',
        payer: {
            email: '<EMAIL>'
        },
    };

    const requestOptions = {
        idempotencyKey: '<IDEMPOTENCY_KEY>',
    };

    payment.create({ body, requestOptions }).then(console.log).catch(console.log);


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