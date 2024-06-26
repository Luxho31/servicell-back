import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import cotizacionRoutes from "./routes/cotizacionRoutes.js";
import repuestoRoutes from "./routes/repuestoRoutes.js";
import carritoRoutes from "./routes/carritoRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import marcaRoutes from "./routes/marcaRoutes.js";

// import mercadopago from "mercadopago"
import { Preference, MercadoPagoConfig } from "mercadopago"

const app = express();
app.use(express.json())
dotenv.config();
conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            // El origen del Request esta permitido
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    },
};

app.use(cors(corsOptions));

// // Mercado pago
// const client = new MercadoPagoConfig({ accessToken: 'TEST-605985810472705-061802-bc26711c25e75c5f11986ed30bbef3e8-1762277778' });


// // Ruta de prueba para recibir notificaciones de pago
// app.post('/pagos/notificacion', (req, res) => {
//     console.log('Notificación de pago recibida:');
//     console.log(req.body);
//     res.sendStatus(200);
// });

// // Ruta para iniciar un pago
// app.post('/pagar', async (req, res) => {

//     const preference = new Preference(client);

//     preference.create({
//         body: {
//             items: [
//                 {
//                     title: 'Mi producto',
//                     quantity: 1,
//                     unit_price: 20
//                 }
//             ],
//         }
//     })
//         .then(console.log)
//         .catch(console.log);
//     res.send('Pago iniciado');
// });

// // Manejar rutas de éxito, pendiente y fracaso
// app.get('/pagos/success', (req, res) => {
//     res.send('Pago exitoso');
// });

// app.get('/pagos/pending', (req, res) => {
//     res.send('Pago pendiente');
// });

// app.get('/pagos/failure', (req, res) => {
//     res.send('Pago fallido');
// });
// // Mercado pago

// Endpoints
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/cotizaciones", cotizacionRoutes);
app.use("/api/repuestos", repuestoRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/Marcas", marcaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});


// REVISAR EL SIGUIENTE ENLACE PARA INTEGRAR MERCADO PAGO, ES UN REPOSITORIO DE GITHUB CON UN EJEMPLO DE INTEGRACION DE LA API
// https://github.com/mercadopago/card-payment-sample/tree/1.0.0?tab=readme-ov-file

// EN NODEJS
// https://github.com/mercadopago/card-payment-sample-node/blob/1.0.0/index.js