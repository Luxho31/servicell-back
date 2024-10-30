import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
	let token = req.cookies.access_token;
	req.session = { user: null };

	if (!token) {
		const error = new Error("Token no válido o inexistente");
		return res.status(403).json({ msg: error.message });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.session.user = await User.findById(decoded.id.id).select(
			"-password"
		);
		next();
	} catch (error) {
		const e = new Error("Token no válido");
		return res.status(403).json({ msg: e.message });
	}
};

export default authMiddleware;