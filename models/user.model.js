import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
        },
        sex: {
            type: String,
            trim: true,
        },
        birthdate: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            // required: true,
            trim: true,
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true,  // Permite valores únicos sin necesidad de estar presentes en todos los documentos
        },
        rol: {
            type: String,
            default: 'USER',
        },
        // token: {
        //     type: String,
        //     required: true,
        // },
    },
    {
        timestamps: true,
    }
)

// Exportacion del Schema
const User = mongoose.model('User', userSchema);
export default User;