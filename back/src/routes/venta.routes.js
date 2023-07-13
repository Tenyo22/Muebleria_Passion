import { Router } from "express";
import { postActualizarVenta, postVenta } from "../controllers/venta.controller.js";

const router = Router();

router.post('/venta', postVenta);
router.post('/ventatotal', postActualizarVenta);

export default router;