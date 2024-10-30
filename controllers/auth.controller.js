import bcrypt from "bcryptjs";
import generarJWT from "../helpers/generarJWT.js";
import User from "../models/user.model.js";

const register = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    const existeUsuario = await User.findOne({ email });

    // Comprobamos que el usuario exista en la base de datos
    if (existeUsuario) {
        const error = new Error("El usuario ya esta registrado");
        return res.status(400).json({ msg: error.message });
    }

    // Comprobamos si las contraseñas coinciden
    if (password !== confirmPassword) {
        const error = new Error("Las contraseñas no coinciden");
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Registrar usuario
        const usuario = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        usuario.password = hashedPassword;
        const usuarioGuardado = await usuario.save();

        // Generar token
        const token = generarJWT({ id: usuario._id, rol: usuario.rol })
        res
            .cookie("access_token", token, {
                httpOnly: true, // No se puede acceder al token desde el navegador, solo desde el servidor
                secure: process.env.NODE_ENV === "production ? true : false", // Solo se envia el token si la conexión es segura (https)
                sameSite: "strict", // El token solo se envia si la petición es del mismo sitio web (dominio)
                maxAge: 1000 * 60 * 60, // La cookie tiene un tiempo de vida de 1 hora
            })
            .json({ usuarioGuardado, token });
    } catch (error) {
        return res.status(500).json({ msg: "Hubo un problema" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Comprobamos que el usuario exista en la base de datos
    const existeUsuario = await User.findOne({ email });
    if (!existeUsuario) {
        const error = new Error("El usuario no existe");
        return res.status(400).json({ msg: error.message });
    }

    // Revisar password
    const passwordCorrecto = await bcrypt.compare(password, existeUsuario.password);
    if (!passwordCorrecto) {
        const error = new Error("La contraseña es incorrecta")
        return res.status(404).json({ msg: error.message });
    }

    // Generar token
    const token = generarJWT({ id: existeUsuario._id, rol: existeUsuario.rol })
    res
        .cookie("access_token", token, {
            httpOnly: true, // No se puede acceder al token desde el navegador, solo desde el servidor
            secure: process.env.NODE_ENV === "production ? true : false", // Solo se envia el token si la conexión es segura (https)
            sameSite: "strict", // El token solo se envia si la petición es del mismo sitio web (dominio)
            maxAge: 1000 * 60 * 60, // La cookie tiene un tiempo de vida de 1 hora
        })
        .json({
            _id: existeUsuario._id,
            email: existeUsuario.email,
            token
        });
};

const profile = async (req, res) => {
    const { user } = req.session;
    // console.log("respose authController", user);
    res.json(user);
};

const logout = async (req, res) => {
    res
        .clearCookie("access_token")
        .json({ msg: "Usuario deslogueado" });
}

export { login, logout, profile, register };

