import { Router } from "express";
import { getDatosCliente, getProductosCliente } from "../controllers/factura.controller.js";

const router = Router();

router.get('/factura/productos/:folioVenta', getProductosCliente);
router.get('/factura/cliente/:folioVenta', getDatosCliente);

export default router;