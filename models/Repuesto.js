import mongoose from "mongoose";

const respuestoSchema = new mongoose.Schema(
    {
        replacement_type: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        // image_url: {
        //     type: String,
        //     required: true,
        // },
    },
    {
        timestamps: true,
    }
);

const Repuesto = mongoose.model("Repuesto", respuestoSchema);

export default Repuesto;
