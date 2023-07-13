import { Router } from "express";
import { deletePedidos, getPedidos } from "../controllers/pedidos.controller.js";


const router = Router();

router.get('/pedidos', getPedidos);
router.delete('/pedidos/:folio', deletePedidos);

export default router;