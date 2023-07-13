import { Router } from 'express';
import { getAUsuario, getUsuarios, postUsuario } from '../controllers/usuarios.controller.js';

const router = Router();

router.get('/usuarios', getUsuarios);
router.get('/usuarios/:username', getAUsuario);
router.post('/usuarios', postUsuario);

export default router;