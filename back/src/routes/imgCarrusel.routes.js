import { Router } from 'express';
import { getImgCarrusel } from '../controllers/imgCarrusel.controller.js';

const router = Router();

router.get('/carrusel', getImgCarrusel);

export default router;