import { Router } from 'express';
import { getPromociones } from '../controllers/promociones.controller.js';

const router = Router();

router.get('/promociones', getPromociones);

export default router;