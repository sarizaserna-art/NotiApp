import express from 'express';
import { registerUser, loginUser, resetAdminPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Ruta temporal para actualizar las claves con bcrypt nativo
router.get('/reset-passwords', resetAdminPassword);

export default router;