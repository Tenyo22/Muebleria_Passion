import { Router } from 'express';
import { getCliente, getClientes, postCliente } from '../controllers/clientes.controller.js'

const router = Router();

router.get('/clientes', getClientes);
router.get('/clientes/:username', getCliente);
router.post('/clientes', postCliente);

export default router;