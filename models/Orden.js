import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        productos: [
            {
                repuesto: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Repuesto',
                    required: true
                },
                cantidad: {
                    type: Number,
                    required: true
                },
                precio_unitario: {
                    type: Number,
                    required: true
                }
            }
        ],
        comprador: {
            nombre: {
                type: String,
                required: true
            },
            apellido: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            telefono: {
                area_codigo: String,
                numero: String
            },
            direccion: {
                calle: String,
                numero: Number,
                codigo_postal: String
            }
        },
        preference_id: {
            type: String,
            required: true
        },
        estado_pago: {
            type: String,
            enum: ['pendiente', 'aprobado', 'fallido'],
            default: 'pendiente'
        },
        fecha_creacion: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;