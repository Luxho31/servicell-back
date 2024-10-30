import { Router } from "express";
const router = Router();

import { login, logout, profile, register } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/profile", authMiddleware, profile)

export default router;