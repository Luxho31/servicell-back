import { Router } from 'express';
import passport from 'passport';
import { googleAuthCallback, getProfile, logout } from '../controllers/auth2Controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
	// successRedirect: 'http://localhost:3000/auth/profile',
	successRedirect: process.env.FRONTEND_URL,
	failureRedirect: 'http://localhost:3000/'
}), googleAuthCallback);

router.get('/profile', authMiddleware, getProfile);

router.get("/login/success", (req, res) => {
	console.log("respuesta", req.user)

	if (req.user) {
		res.status(200).json({
			// success: true,
			message: "user has successfully authenticated",
			user: req.user,
			// cookies: req.cookies
		});
	} else {
		res.status(401).json({
			// success: false,
			message: "user has not authenticated"
		});
	}
});

router.get('/logout', authMiddleware, logout);

export default router;