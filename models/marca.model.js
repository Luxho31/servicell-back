import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
    {
        brand: {
            type: String,
            required: true,
            trim: true,
        },
        model: {
            type: String,
            required: true,
            trim: true,
        },     
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("brand", brandSchema);