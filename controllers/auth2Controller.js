import generarJWT from '../helpers/generarJWT.js';

const googleAuthCallback = async (req, res) => {
    const token = generarJWT(req.usuario._id, req.usuario.rol);
    console.log("token: ", token);
    res.cookie("token", token, { httpOnly: true });
    // res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
    // res.redirect("http://localhost:3000/api/usuarios/profile");
}

const getProfile = async (req, res) => {
    // res.send(req.usuario);
    res.json(req.user);
}

const logout = async (req, res) => {
    // req.logout();
    res.clearCookie("token");
    res.redirect("/");
}

export { googleAuthCallback, getProfile, logout };