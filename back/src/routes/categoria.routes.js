import { Router } from 'express';
import { deleteCategorias, getACategoria, getCategorias, postCategorias, putCategorias } from '../controllers/categoria.controller.js';

const router = Router();

router.get('/categorias', getCategorias);
router.get('/categorias/:id', getACategoria);
router.post('/categorias', postCategorias);
router.put('/categorias/:id', putCategorias);
router.delete('/categorias/:id', deleteCategorias);

export default router;