// import { v4 as uuidv4 } from "uuid";

import { Preference, MercadoPagoConfig } from "mercadopago"
import Orden from '../models/Orden.js';
import Repuesto from '../models/Repuesto.js';

// const client = new MercadoPagoConfig({ accessToken: 'TEST-605985810472705-061802-bc26711c25e75c5f11986ed30bbef3e8-1762277778' });
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-911176942514250-062113-773e06516eea3d6146d37d26de4cc3f5-1864627025' });

const createOrder = async (req, res) => {
    try {
        const { productos, comprador } = req.body;
        const preference = new Preference(client);

        const response = await preference.create({
            body: {
                items: productos.map(producto => ({
                    title: producto.title,
                    quantity: producto.quantity,
                    description: producto.description,
                    unit_price: producto.unit_price
                })),
                payer: {
                    name: comprador.name,
                    surname: comprador.surname,
                    email: comprador.email,
                    phone: {
                        area_code: comprador.phone.area_code,
                        number: comprador.phone.number
                    },
                    identification: {
                        type: comprador.identification.type,
                        number: comprador.identification.number
                    },
                    address: {
                        street_name: 'Insurgentes Sur',
                        street_number: 1602,
                        zip_code: '03940'
                    }
                },
                back_urls: {
                    success: 'http://localhost:3000/api/payment/success',
                    failure: 'http://localhost:3000/api/payment/failure',
                    pending: 'http://localhost:3000/api/payment/pending'
                },
                auto_return: 'approved', // Hace que el usuario sea redirigido automáticamente a la URL de retorno
                notification_url: 'https://webhook.site/d9b459b6-bea3-4839-b0d8-7c26d1457744/webhook',
            }
        })
        // console.log(response);
        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creando la preferencia de pago');
    }
}

const notification = async (req, res) => {
    // console.log('Notificación de pago recibida:');
    // console.log(req.body);
    // res.sendStatus(200);
    // try {
    //     const { type, data } = req.body;

    //     if (type === 'payment') {
    //         const payment_id = data.id;

    //         // Aquí puedes obtener más detalles del pago si es necesario
    //         const payment = await client.payment.get(payment_id);
    //         console.log('Pago recibido:', payment);
    //     }

    //     res.sendStatus(200);
    // } catch (error) {
    //     console.error('Error procesando la notificación:', error);
    //     res.sendStatus(500);
    // }
}

const success = (req, res) => {
    // res.send('Payment successful');
    res.json(req.query);
}

const failure = (req, res) => {
    res.send('Payment failed');
}

const pending = (req, res) => {
    res.send('Payment pending');
}

const receiveWebhook = async (req, res) => {
    // console.log(req.query);
    // // res.send('Webhook received');
    // res.json(req.query);

    const payment = req.query;

    try {
        if (payment.type === 'payment') {
            // Aquí puedes obtener más detalles del pago si es necesario
            const data = await client.payment.findById(payment['data.id']);
            console.log(data);
        }
        // res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message});
        // return res.status(500).send('Error procesando el webhook');
    }

    // const { body } = req;
    // console.log(body);

    // if (body.action === 'payment.created') {
    //     const payment = body.data;
    //     console.log('Payment created:', payment);
    //     res.json({payment});

    //     // const order = await Orden.findOne({ preference_id: payment.order.id });

    //     // if (order) {
    //     //     order.estado_pago = 'aprobado';
    //     //     await order.save();
    //     // }
    // }

    // // res.sendStatus(200);
}

export { createOrder, notification, success, failure, pending, receiveWebhook };