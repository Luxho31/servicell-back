// import { v4 as uuidv4 } from "uuid";

import { Preference, MercadoPagoConfig } from "mercadopago"
import Orden from '../models/Orden.js';
import Repuesto from '../models/Repuesto.js';

// const client = new MercadoPagoConfig({ accessToken: 'TEST-605985810472705-061802-bc26711c25e75c5f11986ed30bbef3e8-1762277778' }); // Token principal Wallet connect
// const client = new MercadoPagoConfig({ accessToken: 'APP_USR-911176942514250-062113-773e06516eea3d6146d37d26de4cc3f5-1864627025' }); // Token de prueba vendedor Wallet connect
const client = new MercadoPagoConfig({ accessToken: 'TEST-2661763250208715-062313-71f3790248b40e8fd04540a94b053e40-1762277778' }); // Token principal Checkout Pro Prueba
// const client = new MercadoPagoConfig({ accessToken: 'TEST-8021851533821614-032518-5e2291ab742081851d0e8355030bbab8-485417535' }); // Token Diego

const createOrder = async (req, res) => {

    const { productos, comprador } = req.body;

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).send('Productos no válidos');
    }

    if (!comprador || typeof comprador !== 'object') {
        return res.status(400).send('Comprador no válido');
    }

    const newOrder = new Orden({
        productos: productos.map(producto => ({
            title: producto.title,
            quantity: producto.quantity,
            unit_price: producto.unit_price
        })),
        comprador: {
            name: comprador.name,
            surname: comprador.surname,
            email: comprador.email,
        },
    });

    await newOrder.save();

    try {
        const preference = new Preference(client);

        const response = await preference.create({
            body: {
                items: productos.map(producto => ({
                    title: producto.title,
                    quantity: producto.quantity,
                    unit_price: producto.unit_price
                })),
                external_reference: '200',
                payer: {
                    name: comprador.name,
                    surname: comprador.surname,
                    email: comprador.email,
                },
                back_urls: {
                    success: 'http://localhost:5173/',
                    failure: 'http://localhost:5173/',
                    pending: 'http://localhost:3000/api/payment/pending'
                },
                notification_url: 'https://webhook.site/d9b459b6-bea3-4839-b0d8-7c26d1457744/webhook',
            }
        })

        newOrder.preference_id = response.id;
        await newOrder.save();

        res.send(response);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error creando la preferencia de pago');
    }
}

const success = (req, res) => {
    res.json(req.query);
}

const failure = (req, res) => {
    res.send('Payment failed');
}

const pending = (req, res) => {
    res.send('Payment pending');
}

const receiveWebhook = async (req, res) => {
    const payment = req.query;

    try {
        if (payment.type === 'payment') {
            const data = await client.payment.findById(payment['data.id']);
            console.log(data);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

export { createOrder, success, failure, pending, receiveWebhook };