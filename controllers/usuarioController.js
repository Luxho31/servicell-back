import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    const existeUsuario = await Usuario.findOne({ email });

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
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();

        // Generar token
        const token = await generarJWT({ id: usuario._id, rol: usuario.rol })
        res.cookie("token", token);
        return res.status(200).json(usuarioGuardado);
    } catch (error) {
        return res.status(500).json({ msg: "Hubo un problema" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Comprobamos que el usuario exista en la base de datos
    const existeUsuario = await Usuario.findOne({ email });
    if (!existeUsuario) {
        const error = new Error("El usuario no existe");
        return res.status(400).json({ msg: error.message });
    }

    // try {
        // Revisar password
        if (await !existeUsuario.comprobarPassword(password)) {
            const error = new Error("La contraseña es incorrecta")
            return res.status(404).json({ msg: error.message });
        }

        // Generar token
        // const token = await generarJWT({ id: existeUsuario._id, rol: existeUsuario.rol })
        // res.cookie("token", token);
        res.json({
            _id: existeUsuario._id,
            name: existeUsuario.name,
            lastname: existeUsuario.lastname,
            email: existeUsuario.email,
            rol: existeUsuario.rol,
            token: generarJWT( existeUsuario._id, existeUsuario.rol),
        });
        // return res.status(200).json({ msg: "Usuario autenticado correctamente" });

    // } catch (error) {
    //     return res.status(500).json({ msg: "Hubo un problema" });
    // }
};

const perfil = async (req, res) => {
    // const { usuario } = req;
    // res.json("usuario");

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Usuario.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        // res.json({ id: user._id, email: user.email, rol: user.rol });
        console.log({ _id: user._id, name: user.name, lastname: user.lastname, email: user.email, rol: user.rol });
        res.json({ _id: user._id, name: user.name, lastname: user.lastname, email: user.email, rol: user.rol });
        // res.json({ id: user._id });
        // res.json(user._id);
    } catch (error) {
        return res.status(401).json({ msg: "Token no válido" });
    }
};

const verificarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token });

    if (tokenValido) {
        // El token es valido el usuario existe
        res.json({ msg: "Token válido y el usuario existe" });
    } else {
        const error = new Error("Token no válido");
        return res.status(400).json({ msg: error.message });
    }
};

export { register, login, perfil, verificarToken };
