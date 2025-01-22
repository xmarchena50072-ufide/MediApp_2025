import { Router } from "express";
import { registerUser, loginUser, forgotPassword, resetPassword, getUserInfo } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

// Ruta para registrar un usuario
router.post("/register", registerUser);

// Ruta para iniciar sesión
router.post("/login", loginUser);

router.get("/me", verifyToken, getUserInfo);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

export default router;
