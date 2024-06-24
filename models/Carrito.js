import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema(
    {
        replacement: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Repuesto',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
        },
        totalPrice: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Carrito = mongoose.model("Carrito", carritoSchema);

export default Carrito;