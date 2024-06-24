import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        productos: [
            {
                // repuesto: {
                //     type: mongoose.Schema.Types.ObjectId,
                //     ref: 'Repuesto',
                //     required: true
                // },
                title: {
                    type: String,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                unit_price: {
                    type: Number,
                    required: true
                }
            }
        ],
        comprador: {
            name: {
                type: String,
                required: true
            },
            surname: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                area_code: {
                    type: String,
                    required: true
                },
                number: {
                    type: String,
                    required: true
                }
            },
            identification: {
                type: {
                    type: String,
                    required: true
                },
                number: {
                    type: String,
                    required: true
                }
            },
            address: {
                street_name: {
                    type: String,
                    required: true
                },
                street_number: {
                    type: Number,
                    required: true
                },
                zip_code: {
                    type: String,
                    required: true
                },
            }
        },
        preference_id: {
            type: String,
            required: true,
            default: '-'
        },
        payment_id: {
            type: String,
            required: true,
            default: '-'
        },
        status: {
            type: String,
            enum: ['PENDING', 'SUCCESS', 'DENIED'],
            default: 'PENDING'
        },
        fecha_creacion: {
            type: Date,
            default: Date.now
        }

        // items: [ { title, quantity, unit_price } ]
        // user_id
        // fecha de creación de la orden
        // payment_id: - *Debe cambiar despues de realizar el pago mostrando el id de la transacción
        // preference_id (id)
        // status: pending *Luego cambiar approved, denied

    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;